// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { StockTransfer } from "./entities/stock-transfer.entity";
// import { Stock } from "D:/sku-management-api/src/modules/stock/entities/stock.entity";
// import { Sku } from "../../shared/database/entities/sku.entity";
// import { Location } from "../../shared/database/entities/location.entity";
// import { TransferStockDto } from "./dto/transfer-stock.dto";

// @Injectable()
// export class StockTransferService {
//   constructor(
//     @InjectRepository(StockTransfer)
//     private transferRepository: Repository<StockTransfer>,

//     @InjectRepository(Stock)
//     private stockRepository: Repository<Stock>,

//     @InjectRepository(Sku)
//     private skuRepository: Repository<Sku>,

//     @InjectRepository(Location)
//     private locationRepository: Repository<Location>
//   ) {}

//   async transferStock(dto: TransferStockDto) {
//     if (dto.sourceLocationId === dto.destinationLocationId) {
//       throw new BadRequestException(
//         "Source and destination locations cannot be the same."
//       );
//     }

//     const sku = await this.skuRepository.findOne({ where: { id: dto.skuId } });
//     if (!sku) throw new NotFoundException("SKU not found");

//     const sourceLocation = await this.locationRepository.findOne({
//       where: { id: dto.sourceLocationId },
//     });
//     if (!sourceLocation)
//       throw new NotFoundException("Source location not found");

//     const destinationLocation = await this.locationRepository.findOne({
//       where: { id: dto.destinationLocationId },
//     });
//     if (!destinationLocation)
//       throw new NotFoundException("Destination location not found");

//     // Validate stock at source
//     const sourceStock = await this.stockRepository.findOne({
//       where: { sku: { id: dto.skuId }, location: { id: dto.sourceLocationId } },
//     });

//     if (!sourceStock || sourceStock.quantity < dto.quantity) {
//       throw new BadRequestException("Insufficient stock at source location");
//     }

//     // Deduct stock from source
//     sourceStock.quantity -= dto.quantity;
//     await this.stockRepository.save(sourceStock);

//     // Add stock to destination
//     let destinationStock = await this.stockRepository.findOne({
//       relations: ["sku", "location"],
//       where: {
//         sku: { id: dto.skuId },
//         location: { id: dto.destinationLocationId.toString() },
//       },
//     });

//     if (!destinationStock) {
//       // destinationStock = this.stockRepository.create({
//       //   sku: { id: sku.id },
//       //   location: destinationLocation.id,
//       //   quantity: dto.quantity,
//       // });
//       const newStock = new Stock();
//       newStock.sku = sku;
//       newStock.location = destinationLocation.id.toString();
//       newStock.quantity = dto.quantity;
//       destinationStock = this.stockRepository.create(newStock);
//     } else {
//       destinationStock.quantity += dto.quantity;
//     }

//     await this.stockRepository.save(destinationStock);

//     // Log the transfer
//     const transferLog = this.transferRepository.create({
//       sku,
//       sourceLocation,
//       destinationLocation,
//       quantity: dto.quantity,
//     });

//     await this.transferRepository.save(transferLog);

//     return {
//       message: "Stock transferred successfully",
//       transferLog,
//     };
//   }

//   async getAllTransfers() {
//     return await this.transferRepository.find({
//       relations: ["sku", "sourceLocation", "destinationLocation"],
//       order: { transferred_at: "DESC" },
//     });
//   }
// }

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StockTransfer } from "./entities/stock-transfer.entity";
import { Stock } from "../stock/entities/stock.entity";
import { Sku } from "../../shared/database/entities/sku.entity";
import { Location } from "../../shared/database/entities/location.entity";
import { TransferStockDto } from "./dto/transfer-stock.dto";

@Injectable()
export class StockTransferService {
  constructor(
    @InjectRepository(StockTransfer)
    private transferRepository: Repository<StockTransfer>,

    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,

    @InjectRepository(Sku)
    private skuRepository: Repository<Sku>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ) {}

  async transferStock(dto: TransferStockDto) {
    if (dto.sourceLocationId === dto.destinationLocationId) {
      throw new BadRequestException(
        "Source and destination locations cannot be the same."
      );
    }

    const sku = await this.skuRepository.findOne({ where: { id: dto.skuId } });
    if (!sku) throw new NotFoundException("SKU not found");

    const sourceLocation = await this.locationRepository.findOne({
      where: { id: dto.sourceLocationId },
    });
    if (!sourceLocation)
      throw new NotFoundException("Source location not found");

    const destinationLocation = await this.locationRepository.findOne({
      where: { id: dto.destinationLocationId },
    });
    if (!destinationLocation)
      throw new NotFoundException("Destination location not found");

    // Validate stock at source
    const sourceStock = await this.stockRepository.findOne({
      where: { sku: { id: dto.skuId }, location: { id: dto.sourceLocationId } },
      relations: ["sku", "location"],
    });

    if (!sourceStock || sourceStock.quantity < dto.quantity) {
      throw new BadRequestException("Insufficient stock at source location");
    }

    // Deduct stock from source
    sourceStock.quantity -= dto.quantity;
    await this.stockRepository.save(sourceStock);

    // Add stock to destination
    let destinationStock = await this.stockRepository.findOne({
      where: {
        sku: { id: dto.skuId },
        location: { id: dto.destinationLocationId },
      },
      relations: ["sku", "location"],
    });

    if (!destinationStock) {
      destinationStock = this.stockRepository.create({
        sku,
        location: destinationLocation,
        quantity: dto.quantity,
      });
    } else {
      destinationStock.quantity += dto.quantity;
    }

    await this.stockRepository.save(destinationStock);

    // Log the transfer
    const transferLog = this.transferRepository.create({
      sku,
      sourceLocation,
      destinationLocation,
      quantity: dto.quantity,
    });

    await this.transferRepository.save(transferLog);

    return {
      message: "Stock transferred successfully",
      transferLog,
    };
  }

  async getAllTransfers() {
    return await this.transferRepository.find({
      relations: ["sku", "sourceLocation", "destinationLocation"],
      order: { transferred_at: "DESC" },
    });
  }
}
