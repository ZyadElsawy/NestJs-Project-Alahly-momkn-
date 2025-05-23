import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { SkuService } from "./sku.service";
import { CreateSkuDto } from "./dto/create-sku.dto";
import { UpdateSkuDto } from "./dto/update-sku.dto";

@ApiTags("SKU")
@Controller("sku")
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
  @ApiOperation({ summary: "Create a new SKU" })
  @ApiBody({ type: CreateSkuDto })
  @ApiResponse({
    status: 201,
    description: "SKU has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 409, description: "SKU code already exists." })
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.skuService.create(createSkuDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all SKUs" })
  @ApiResponse({
    status: 200,
    description: "List of all SKUs retrieved successfully.",
  })
  findAll() {
    return this.skuService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a SKU by ID" })
  @ApiParam({ name: "id", description: "SKU ID", type: "number" })
  @ApiResponse({
    status: 200,
    description: "SKU retrieved successfully.",
  })
  @ApiResponse({ status: 404, description: "SKU not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.skuService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a SKU" })
  @ApiParam({ name: "id", description: "SKU ID", type: "number" })
  @ApiBody({ type: UpdateSkuDto })
  @ApiResponse({
    status: 200,
    description: "SKU has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "SKU not found." })
  @ApiResponse({ status: 409, description: "SKU code already exists." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSkuDto: UpdateSkuDto
  ) {
    return this.skuService.update(id, updateSkuDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a SKU" })
  @ApiParam({ name: "id", description: "SKU ID", type: "number" })
  @ApiResponse({
    status: 200,
    description: "SKU has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "SKU not found." })
  @ApiResponse({
    status: 400,
    description: "Cannot delete SKU with existing stock records.",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.skuService.remove(id);
  }
}
