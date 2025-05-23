import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the location",
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: "Main Branch", description: "Name of the location" })
  @Column()
  name!: string;

  @ApiProperty({
    example: "123 Main St",
    description: "Address of the location",
    required: false,
  })
  @Column({ nullable: true })
  address!: string;
}
