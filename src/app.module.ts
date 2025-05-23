import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockModule } from "./modules/stock/stock.module";
import { ReorderAlertModule } from "./modules/reorder-alert/reorder-alert.module";
import { StockTransferModule } from "./modules/stock-transfer/stock-transfer.module";
import { BranchStockModule } from "./modules/branch-stock/branch-stock.module";
import { Sku } from "./shared/database/entities/sku.entity";
import { Stock } from "./modules/stock/entities/stock.entity";
import { ReorderAlert } from "./modules/reorder-alert/entities/reorder-alert.entity";
import { Location } from "./shared/database/entities/location.entity";
import { StockTransfer } from "./modules/stock-transfer/entities/stock-transfer.entity";
import { SkuModule } from "./modules/sku/sku.module";
import ormConfig from "./config/ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    SkuModule,
    StockModule,
    ReorderAlertModule,
    StockTransferModule,
    BranchStockModule,
  ],
})
export class AppModule {}
