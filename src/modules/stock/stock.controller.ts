import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { StockService } from "./stock.service";
import { AddStockDto } from "./dto/add-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

@ApiTags("Stock")
@Controller("stock")
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post("add")
  @ApiOperation({ summary: "Add stock to a location" })
  @ApiBody({ type: AddStockDto })
  @ApiResponse({
    status: 201,
    description: "Stock has been successfully added.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 404, description: "SKU or Location not found." })
  addStock(@Body() dto: AddStockDto) {
    return this.stockService.addStock(dto);
  }

  @Patch("update")
  @ApiOperation({ summary: "Update stock quantity" })
  @ApiBody({ type: UpdateStockDto })
  @ApiResponse({
    status: 200,
    description: "Stock quantity has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 404, description: "Stock record not found." })
  updateStock(@Body() dto: UpdateStockDto) {
    return this.stockService.updateStockQuantity(dto);
  }

  @Get("by-sku-location")
  @ApiOperation({ summary: "Get stock by SKU and location" })
  @ApiQuery({ name: "skuId", description: "SKU ID", type: "number" })
  @ApiQuery({ name: "location", description: "Location ID", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Stock record retrieved successfully.",
  })
  @ApiResponse({ status: 404, description: "Stock record not found." })
  getBySkuLocation(
    @Query("skuId", ParseIntPipe) skuId: number,
    @Query("location") location: number
  ) {
    return this.stockService.getStockBySkuAndLocation(skuId, location);
  }

  @Get()
  @ApiOperation({ summary: "Get all stock records" })
  @ApiResponse({
    status: 200,
    description: "List of all stock records retrieved successfully.",
  })
  getAll() {
    return this.stockService.getAllStock();
  }
}
