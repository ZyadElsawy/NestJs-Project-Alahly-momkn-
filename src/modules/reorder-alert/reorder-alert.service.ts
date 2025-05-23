import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReorderAlert } from "./entities/reorder-alert.entity";
import { Sku } from "../../shared/database/entities/sku.entity";
import { Stock } from "../stock/entities/stock.entity";
import { SetReorderThresholdDto } from "./dto/set-reorder-threshold.dto";

@Injectable()
export class ReorderAlertService {
  constructor(
    @InjectRepository(ReorderAlert)
    private reorderAlertRepository: Repository<ReorderAlert>,

    @InjectRepository(Sku)
    private skuRepository: Repository<Sku>,

    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>
  ) {}

  async setReorderThreshold(dto: SetReorderThresholdDto) {
    const sku = await this.skuRepository.findOne({ where: { id: dto.skuId } });
    if (!sku) throw new NotFoundException("SKU not found");

    let alert = await this.reorderAlertRepository.findOne({
      where: { sku: { id: dto.skuId } },
    });

    if (!alert) {
      alert = this.reorderAlertRepository.create({
        sku,
        reorder_threshold: dto.threshold,
        alert_sent: false,
      });
    } else {
      alert.reorder_threshold = dto.threshold;
      alert.alert_sent = false; // Reset alert to allow triggering again.
    }

    await this.reorderAlertRepository.save(alert);

    return alert;
  }

  async checkAndTriggerAlerts() {
    const alerts = await this.reorderAlertRepository.find({
      relations: ["sku"],
    });

    for (const alert of alerts) {
      const totalStock = await this.stockRepository
        .createQueryBuilder("stock")
        .select("SUM(stock.quantity)", "sum")
        .where("stock.sku_id = :skuId", { skuId: alert.sku.id })
        .getRawOne();

      const stockQty = parseInt(totalStock.sum || 0);

      if (stockQty <= alert.reorder_threshold && !alert.alert_sent) {
        // Simulate sending notification (e.g., webhook/email/in-app notification)
        console.log(
          `ALERT: SKU ${alert.sku.code} stock low at ${stockQty}. Threshold is ${alert.reorder_threshold}`
        );

        alert.alert_sent = true;
        await this.reorderAlertRepository.save(alert);
      }
    }

    return { status: "Checked all SKUs and triggered alerts if applicable." };
  }

  async getAllAlerts() {
    return await this.reorderAlertRepository.find({ relations: ["sku"] });
  }
}
