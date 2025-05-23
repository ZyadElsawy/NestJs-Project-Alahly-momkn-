// import { IsInt, IsString, IsNotEmpty } from "class-validator";

// export class AddStockDto {
//   @IsInt()
//   skuId!: number;

//   @IsString()
//   @IsNotEmpty()
//   location!: string;

//   @IsInt()
//   quantity!: number;
// }

import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddStockDto {
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
    description: "Quantity to add",
    example: 100,
  })
  @IsInt()
  quantity!: number;
}
