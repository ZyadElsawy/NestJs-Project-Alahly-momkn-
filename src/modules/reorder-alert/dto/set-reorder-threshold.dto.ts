// import { IsInt } from "class-validator";

// export class SetReorderThresholdDto {
//   @IsInt()
//   skuId!: number;

//   @IsInt()
//   threshold!: number;
// }

import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetReorderThresholdDto {
  @ApiProperty({
    example: 1,
    description: "ID of the SKU to apply the reorder threshold to",
  })
  @IsInt()
  skuId!: number;

  @ApiProperty({
    example: 50,
    description: "The quantity at which reorder alert is triggered",
  })
  @IsInt()
  threshold!: number;
}
