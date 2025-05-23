import { Controller, Post, Body, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { StockTransferService } from "./stock-transfer.service";
import { TransferStockDto } from "./dto/transfer-stock.dto";

@ApiTags("Stock Transfer")
@Controller("stock-transfer")
export class StockTransferController {
  constructor(private stockTransferService: StockTransferService) {}

  @Post()
  @ApiOperation({ summary: "Transfer stock between locations" })
  @ApiBody({ type: TransferStockDto })
  @ApiResponse({
    status: 201,
    description: "Stock has been successfully transferred.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 404, description: "SKU or Location not found." })
  @ApiResponse({ status: 409, description: "Insufficient stock for transfer." })
  transferStock(@Body() dto: TransferStockDto) {
    return this.stockTransferService.transferStock(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all stock transfers" })
  @ApiResponse({
    status: 200,
    description: "List of all stock transfers retrieved successfully.",
  })
  getAllTransfers() {
    return this.stockTransferService.getAllTransfers();
  }
}
