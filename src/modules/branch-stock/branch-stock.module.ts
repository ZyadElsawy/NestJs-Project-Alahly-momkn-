import { Module } from "@nestjs/common";
import { BranchStockService } from "./branch-stock.service";
import { BranchStockController } from "./branch-stock.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "../stock/entities/stock.entity";
import { Location } from "../../shared/database/entities/location.entity";
import { Sku } from "../../shared/database/entities/sku.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Location, Sku])],
  providers: [BranchStockService],
  controllers: [BranchStockController],
})
export class BranchStockModule {}
