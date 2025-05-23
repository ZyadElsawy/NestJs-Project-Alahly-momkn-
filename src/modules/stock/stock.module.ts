import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "./entities/stock.entity";
import { Sku } from "../../shared/database/entities/sku.entity";
import { StockService } from "./stock.service";
import { Location } from "../../shared/database/entities/location.entity";
import { StockController } from "./stock.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Sku, Location])],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
