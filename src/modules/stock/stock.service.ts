// import { Injectable, NotFoundException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { Stock } from "./entities/stock.entity";
// import { Sku } from "../../shared/database/entities/sku.entity";
// import { AddStockDto } from "./dto/add-stock.dto";
// import { UpdateStockDto } from "./dto/update-stock.dto";

// @Injectable()
// export class StockService {
//   constructor(
//     @InjectRepository(Stock)
//     private stockRepository: Repository<Stock>,

//     @InjectRepository(Sku)
//     private skuRepository: Repository<Sku>
//   ) {}

//   async addStock(dto: AddStockDto) {
//     const sku = await this.skuRepository.findOne({ where: { id: dto.skuId } });
//     if (!sku) throw new NotFoundException("SKU not found");

//     let stock = await this.stockRepository.findOne({
//       where: { sku: { id: dto.skuId }, location: dto.location },
//     });

//     if (!stock) {
//       stock = this.stockRepository.create({
//         sku,
//         location: dto.location,
//         quantity: dto.quantity,
//       });
//     } else {
//       stock.quantity += dto.quantity;
//     }

//     return await this.stockRepository.save(stock);
//   }

//   async updateStockQuantity(dto: UpdateStockDto) {
//     const stock = await this.stockRepository.findOne({
//       relations: ["sku"],
//       where: { sku: { id: dto.skuId }, location: dto.location },
//     });

//     if (!stock) throw new NotFoundException("Stock entry not found");

//     stock.quantity = dto.newQuantity;
//     return await this.stockRepository.save(stock);
//   }

//   async getStockBySkuAndLocation(skuId: number, location: string) {
//     const stock = await this.stockRepository.findOne({
//       relations: ["sku"],
//       where: { sku: { id: skuId }, location },
//     });
//     if (!stock) throw new NotFoundException("Stock entry not found");
//     return stock;
//   }

//   async getAllStock() {
//     return await this.stockRepository.find({ relations: ["sku"] });
//   }
// }

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Stock } from "./entities/stock.entity";
import { Sku } from "../../shared/database/entities/sku.entity";
import { Location } from "../../shared/database/entities/location.entity";
import { AddStockDto } from "./dto/add-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,

    @InjectRepository(Sku)
    private skuRepository: Repository<Sku>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ) {}

  async addStock(dto: AddStockDto) {
    const sku = await this.skuRepository.findOne({ where: { id: dto.skuId } });
    if (!sku) throw new NotFoundException("SKU not found");

    const location = await this.locationRepository.findOne({
      where: { id: dto.locationId },
    });
    if (!location) throw new NotFoundException("Location not found");

    let stock = await this.stockRepository.findOne({
      where: { sku: { id: dto.skuId }, location: { id: dto.locationId } },
      relations: ["sku", "location"],
    });

    if (!stock) {
      stock = this.stockRepository.create({
        sku,
        location,
        quantity: dto.quantity,
      });
    } else {
      stock.quantity += dto.quantity;
    }

    return await this.stockRepository.save(stock);
  }

  async updateStockQuantity(dto: UpdateStockDto) {
    const location = await this.locationRepository.findOne({
      where: { id: dto.locationId },
    });
    if (!location) throw new NotFoundException("Location not found");

    const stock = await this.stockRepository.findOne({
      relations: ["sku", "location"],
      where: { sku: { id: dto.skuId }, location: { id: dto.locationId } },
    });

    if (!stock) throw new NotFoundException("Stock entry not found");

    stock.quantity = dto.newQuantity;
    return await this.stockRepository.save(stock);
  }

  async getStockBySkuAndLocation(skuId: number, locationId: number) {
    const stock = await this.stockRepository.findOne({
      relations: ["sku", "location"],
      where: { sku: { id: skuId }, location: { id: locationId } },
    });
    if (!stock) throw new NotFoundException("Stock entry not found");
    return stock;
  }

  async getAllStock() {
    return await this.stockRepository.find({ relations: ["sku", "location"] });
  }
}
