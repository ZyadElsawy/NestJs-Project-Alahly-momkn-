import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockTransfer } from "./entities/stock-transfer.entity";
import { StockTransferService } from "./stock-transfer.service";
import { StockTransferController } from "./stock-transfer.controller";
import { Stock } from "../stock/entities/stock.entity";
import { Sku } from "../../shared/database/entities/sku.entity";
import { Location } from "../../shared/database/entities/location.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StockTransfer, Stock, Sku, Location])],
  providers: [StockTransferService],
  controllers: [StockTransferController],
})
export class StockTransferModule {}
