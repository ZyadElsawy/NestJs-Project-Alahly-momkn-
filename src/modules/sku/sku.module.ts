// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { Sku } from "../../shared/database/entities/sku.entity";
// import { SkuService } from "./sku.service";
// import { SkuController } from "./sku.controller";

// @Module({
//   imports: [TypeOrmModule.forFeature([Sku])],
//   providers: [SkuService],
//   controllers: [SkuController],
// })
// export class SkuModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sku } from "../../shared/database/entities/sku.entity";
import { Stock } from "../stock/entities/stock.entity"; // 👈 Import Stock
import { SkuService } from "./sku.service";
import { SkuController } from "./sku.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Sku, Stock])], // 👈 Include Stock
  providers: [SkuService],
  controllers: [SkuController],
})
export class SkuModule {}
