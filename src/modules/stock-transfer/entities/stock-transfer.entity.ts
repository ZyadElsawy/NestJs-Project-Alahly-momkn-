// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   CreateDateColumn,
// } from "typeorm";
// import { Sku } from "../../../shared/database/entities/sku.entity";
// import { Location } from "../../../shared/database/entities/location.entity";

// @Entity()
// export class StockTransfer {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @ManyToOne(() => Sku)
//   @JoinColumn({ name: "sku_id" })
//   sku!: Sku;

//   @ManyToOne(() => Location)
//   @JoinColumn({ name: "source_location_id" })
//   sourceLocation!: Location;

//   @ManyToOne(() => Location)
//   @JoinColumn({ name: "destination_location_id" })
//   destinationLocation!: Location;

//   @Column({ type: "int" })
//   quantity!: number;

//   @CreateDateColumn()
//   transferred_at!: Date;

//   @ManyToOne(() => Location)
//   @JoinColumn({ name: "location_id" })
//   location!: Location;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Sku } from "../../../shared/database/entities/sku.entity";
import { Location } from "../../../shared/database/entities/location.entity";

@Entity()
export class StockTransfer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Sku)
  @JoinColumn({ name: "sku_id" })
  sku!: Sku;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "source_location_id" })
  sourceLocation!: Location;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "destination_location_id" })
  destinationLocation!: Location;

  @Column({ type: "int" })
  quantity!: number;

  @CreateDateColumn()
  transferred_at!: Date;
}
