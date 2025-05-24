"use strict";
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";
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
exports.Sku = void 0;
// @Entity()
// export class Sku {
//   @PrimaryGeneratedColumn()
//   id!: number;
//   @Column({ unique: true })
//   code!: string;
//   @Column()
//   name!: string;
//   @Column({ nullable: true })
//   description!: string;
//   @CreateDateColumn()
//   created_at!: Date;
//   @UpdateDateColumn()
//   updated_at!: Date;
// }
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const stock_entity_1 = require("../../../modules/stock/entities/stock.entity"); // Adjust path as needed
let Sku = class Sku {
};
exports.Sku = Sku;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Unique identifier for the SKU" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sku.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "SKU001", description: "Unique code for the SKU" }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Sku.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Product A", description: "Name of the SKU" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sku.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Detailed description",
        description: "Description of the SKU",
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sku.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-01T00:00:00Z",
        description: "When the SKU was created",
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sku.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-01T00:00:00Z",
        description: "When the SKU was last updated",
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sku.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [stock_entity_1.Stock],
        description: "Stock entries for this SKU",
    }),
    (0, typeorm_1.OneToMany)(() => stock_entity_1.Stock, (stock) => stock.sku),
    __metadata("design:type", Array)
], Sku.prototype, "stocks", void 0);
exports.Sku = Sku = __decorate([
    (0, typeorm_1.Entity)()
], Sku);
//# sourceMappingURL=sku.entity.js.map