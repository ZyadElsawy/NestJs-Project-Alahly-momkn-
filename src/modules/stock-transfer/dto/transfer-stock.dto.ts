import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TransferStockDto {
  @ApiProperty({
    description: "SKU ID",
    example: 1,
  })
  @IsInt()
  skuId!: number;

  @ApiProperty({
    description: "Source location ID",
    example: 1,
  })
  @IsInt()
  sourceLocationId!: number;

  @ApiProperty({
    description: "Destination location ID",
    example: 2,
  })
  @IsInt()
  destinationLocationId!: number;

  @ApiProperty({
    description: "Quantity to transfer",
    example: 50,
  })
  @IsInt()
  quantity!: number;
}
