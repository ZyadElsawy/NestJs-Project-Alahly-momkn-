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

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Sku } from "../../../shared/database/entities/sku.entity";
import { Location } from "../../../shared/database/entities/location.entity";

@Entity()
@Unique(["sku", "location"])
export class Stock {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the stock entry",
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    type: () => Sku,
    description: "The SKU this stock entry is for",
  })
  @ManyToOne(() => Sku)
  @JoinColumn({ name: "sku_id" })
  sku!: Sku;

  @ApiProperty({
    type: () => Location,
    description: "The location where this stock is stored",
  })
  @ManyToOne(() => Location)
  @JoinColumn({ name: "location_id" })
  location!: Location;

  @ApiProperty({
    example: 100,
    description: "The quantity of the SKU in stock",
  })
  @Column({ type: "int", default: 0 })
  quantity!: number;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "When the stock entry was created",
  })
  @CreateDateColumn()
  created_at!: Date;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "When the stock entry was last updated",
  })
  @UpdateDateColumn()
  updated_at!: Date;
}
