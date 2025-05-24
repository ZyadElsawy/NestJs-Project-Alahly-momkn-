"use strict";
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   Unique,
// } from "typeorm";
// import { Sku } from "../../../shared/database/entities/sku.entity";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
// @Entity()
// @Unique(["sku", "location"])
// export class Stock {
//   @PrimaryGeneratedColumn()
//   id!: number;
//   @ManyToOne(() => Sku)
//   @JoinColumn({ name: "sku_id" })
//   sku: Sku;
//   @ManyToOne(() => Location)
//   @JoinColumn({ name: "location_id" })
//   location: Location; // Example: 'Branch A', 'Branch B'
//   @Column({ type: "int", default: 0 })
//   quantity!: number;
//   @CreateDateColumn()
//   created_at!: Date;
//   @UpdateDateColumn()
//   updated_at!: Date;
// }
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const sku_entity_1 = require("../../../shared/database/entities/sku.entity");
const location_entity_1 = require("../../../shared/database/entities/location.entity");
let Stock = class Stock {
};
exports.Stock = Stock;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "Unique identifier for the stock entry",
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stock.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => sku_entity_1.Sku,
        description: "The SKU this stock entry is for",
    }),
    (0, typeorm_1.ManyToOne)(() => sku_entity_1.Sku),
    (0, typeorm_1.JoinColumn)({ name: "sku_id" }),
    __metadata("design:type", sku_entity_1.Sku)
], Stock.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => location_entity_1.Location,
        description: "The location where this stock is stored",
    }),
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location),
    (0, typeorm_1.JoinColumn)({ name: "location_id" }),
    __metadata("design:type", location_entity_1.Location)
], Stock.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: "The quantity of the SKU in stock",
    }),
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stock.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-01T00:00:00Z",
        description: "When the stock entry was created",
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Stock.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-01T00:00:00Z",
        description: "When the stock entry was last updated",
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Stock.prototype, "updated_at", void 0);
exports.Stock = Stock = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["sku", "location"])
], Stock);
//# sourceMappingURL=stock.entity.js.map