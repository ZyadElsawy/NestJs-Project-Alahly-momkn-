import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReorderAlert } from "./entities/reorder-alert.entity";
import { ReorderAlertService } from "./reorder-alert.service";
import { ReorderAlertController } from "./reorder-alert.controller";
import { Sku } from "../../shared/database/entities/sku.entity";
import { Stock } from "../stock/entities/stock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReorderAlert, Sku, Stock])],
  providers: [ReorderAlertService],
  controllers: [ReorderAlertController],
})
export class ReorderAlertModule {}
