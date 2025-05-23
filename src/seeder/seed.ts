import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DataSource } from "typeorm";
import { Sku } from "../shared/database/entities/sku.entity";
import { Location } from "../shared/database/entities/location.entity";
import { Stock } from "../modules/stock/entities/stock.entity";
import { ReorderAlert } from "../modules/reorder-alert/entities/reorder-alert.entity";
import { StockTransfer } from "../modules/stock-transfer/entities/stock-transfer.entity";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const skuRepo = dataSource.getRepository(Sku);
  const locRepo = dataSource.getRepository(Location);
  const stockRepo = dataSource.getRepository(Stock);
  const reorderRepo = dataSource.getRepository(ReorderAlert);
  const transferRepo = dataSource.getRepository(StockTransfer);

  // await transferRepo.clear(); // StockTransfer depends on Sku + Location
  // await reorderRepo.clear(); // ReorderAlert depends on Sku
  // await stockRepo.clear(); // Stock depends on Sku + Location
  // // await branchStockRepo.clear();     // BranchStock depends on Sku + Location (if used)

  // await skuRepo.clear(); // Sku can now be safely cleared
  // await locRepo.clear(); // Location can now be safely cleared

  // Clear all related tables in the correct order with cascade
  await dataSource.query(
    `TRUNCATE TABLE "stock_transfer", "reorder_alert", "stock", "sku", "location" CASCADE`
  );
  // Seed Locations
  const loc1 = locRepo.create({ name: "Main Branch" });
  const loc2 = locRepo.create({ name: "Downtown Branch" });
  await locRepo.save([loc1, loc2]);

  // Seed SKUs
  const sku1 = skuRepo.create({ code: "SKU001", name: "Product A" });
  const sku2 = skuRepo.create({ code: "SKU002", name: "Product B" });
  await skuRepo.save([sku1, sku2]);

  // Seed Stock
  await stockRepo.save([
    stockRepo.create({ sku: sku1, location: loc1, quantity: 100 }),
    stockRepo.create({ sku: sku2, location: loc2, quantity: 200 }),
  ]);

  // Seed Reorder Alerts
  await reorderRepo.save([
    reorderRepo.create({ sku: sku1, reorder_threshold: 50 }),
    reorderRepo.create({ sku: sku2, reorder_threshold: 150 }),
  ]);

  // Seed Stock Transfers
  await transferRepo.save([
    transferRepo.create({
      sku: sku1,
      sourceLocation: loc1,
      destinationLocation: loc2,
      quantity: 20,
    }),
  ]);

  console.log("✅ Database seeded!");
  await app.close();
}

bootstrap();

// npx ts-node src/modules/seeder/seed.ts
