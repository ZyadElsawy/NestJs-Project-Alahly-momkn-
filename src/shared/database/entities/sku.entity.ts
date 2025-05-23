// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";

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

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Stock } from "../../../modules/stock/entities/stock.entity"; // Adjust path as needed

@Entity()
export class Sku {
  @ApiProperty({ example: 1, description: "Unique identifier for the SKU" })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: "SKU001", description: "Unique code for the SKU" })
  @Column({ unique: true })
  code!: string;

  @ApiProperty({ example: "Product A", description: "Name of the SKU" })
  @Column()
  name!: string;

  @ApiProperty({
    example: "Detailed description",
    description: "Description of the SKU",
    required: false,
  })
  @Column({ nullable: true })
  description!: string;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "When the SKU was created",
  })
  @CreateDateColumn()
  created_at!: Date;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "When the SKU was last updated",
  })
  @UpdateDateColumn()
  updated_at!: Date;

  @ApiProperty({
    type: () => [Stock],
    description: "Stock entries for this SKU",
  })
  @OneToMany(() => Stock, (stock) => stock.sku)
  stocks: Stock[]; //  Add this for deletion guard logic
}
