import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Stock } from "../stock/entities/stock.entity";
import { Location } from "../../shared/database/entities/location.entity";
import { Sku } from "../../shared/database/entities/sku.entity";

@Injectable()
export class BranchStockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Sku)
    private skuRepository: Repository<Sku>
  ) {}

  // async getStockByBranch(locationId: number) {
  //   const location = await this.locationRepository.findOne({
  //     where: { id: locationId },
  //   });
  //   if (!location) throw new NotFoundException("Location not found");

  //   const stocks = await this.stockRepository.find({
  //     where: { location: locationId },
  //     relations: ["sku"],
  //   });

  //   return stocks.map((stock) => ({
  //     skuCode: stock.sku.code,
  //     skuName: stock.sku.name,
  //     quantity: stock.quantity,
  //   }));
  // }
  async getStockByBranch(locationId: number) {
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });
    if (!location) throw new NotFoundException("Location not found");

    const stocks = await this.stockRepository.find({
      where: { location: { id: locationId } },
      relations: ["sku"],
    });

    return stocks.map((stock) => ({
      skuCode: stock.sku.code,
      skuName: stock.sku.name,
      quantity: stock.quantity,
    }));
  }

  async getSkuStockAtBranch(locationId: number, skuId: number) {
    const stock = await this.stockRepository.findOne({
      where: { location: { id: locationId }, sku: { id: skuId } },
      relations: ["sku", "location"],
    });

    if (!stock)
      throw new NotFoundException(
        "Stock not found for this SKU at the specified location"
      );

    return {
      skuCode: stock.sku.code,
      skuName: stock.sku.name,
      locationName: stock.location,
      quantity: stock.quantity,
    };
  }
}
