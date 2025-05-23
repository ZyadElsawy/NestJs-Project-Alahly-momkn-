import { IsString, IsOptional, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSkuDto {
  @ApiProperty({
    description: "Unique SKU code",
    example: "SKU001",
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({
    description: "SKU name",
    example: "Product Name",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "SKU description",
    example: "Detailed description of the product",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
