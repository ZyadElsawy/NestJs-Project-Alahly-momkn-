import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Sku } from "../../../shared/database/entities/sku.entity";

@Entity()
@Unique(["sku"])
export class ReorderAlert {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the reorder alert",
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: () => Sku, description: "The SKU this alert is for" })
  @ManyToOne(() => Sku)
  @JoinColumn({ name: "sku_id" })
  sku!: Sku;

  @ApiProperty({
    example: 50,
    description: "The quantity threshold that triggers the reorder alert",
  })
  @Column({ type: "int" })
  reorder_threshold!: number;

  @ApiProperty({
    example: false,
    description: "Whether the alert has been sent",
  })
  @Column({ default: false })
  alert_sent!: boolean;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "When the alert was created",
  })
  @CreateDateColumn()
  created_at!: Date;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "When the alert was last updated",
  })
  @UpdateDateColumn()
  updated_at!: Date;
}
