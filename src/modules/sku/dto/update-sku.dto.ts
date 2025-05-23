import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSkuDto {
  @ApiProperty({
    description: "SKU name",
    example: "Updated Product Name",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "SKU description",
    example: "Updated detailed description of the product",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
