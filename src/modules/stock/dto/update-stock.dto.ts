// import { IsInt, IsString, IsNotEmpty } from "class-validator";

// export class UpdateStockDto {
//   @IsInt()
//   skuId!: number;

//   @IsString()
//   @IsNotEmpty()
//   location!: string;

//   @IsInt()
//   newQuantity!: number;
// }

import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStockDto {
  @ApiProperty({
    description: "SKU ID",
    example: 1,
  })
  @IsInt()
  skuId!: number;

  @ApiProperty({
    description: "Location ID",
    example: 1,
  })
  @IsInt()
  locationId!: number;

  @ApiProperty({
    description: "New quantity value",
    example: 150,
  })
  @IsInt()
  newQuantity!: number;
}
