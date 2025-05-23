// import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
// import { BranchStockService } from "./branch-stock.service";

// @Controller("branch-stock")
// export class BranchStockController {
//   constructor(private branchStockService: BranchStockService) {}

//   @Get(":locationId")
//   getStockByBranch(@Param("locationId", ParseIntPipe) locationId: number) {
//     return this.branchStockService.getStockByBranch(locationId);
//   }

//   @Get(":locationId/sku/:skuId")
//   getSkuStockAtBranch(
//     @Param("locationId", ParseIntPipe) locationId: number,
//     @Param("skuId", ParseIntPipe) skuId: number
//   ) {
//     return this.branchStockService.getSkuStockAtBranch(locationId, skuId);
//   }
// }

import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { BranchStockService } from "./branch-stock.service";
import { ApiTags, ApiParam, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Branch Stock")
@Controller("branch-stock")
export class BranchStockController {
  constructor(private branchStockService: BranchStockService) {}

  @Get(":locationId")
  @ApiOperation({ summary: "Get all SKU stock at a specific branch" })
  @ApiParam({
    name: "locationId",
    type: Number,
    description: "The ID of the branch location",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Stock list retrieved successfully",
  })
  getStockByBranch(@Param("locationId", ParseIntPipe) locationId: number) {
    return this.branchStockService.getStockByBranch(locationId);
  }

  @Get(":locationId/sku/:skuId")
  @ApiOperation({ summary: "Get specific SKU stock at a specific branch" })
  @ApiParam({
    name: "locationId",
    type: Number,
    description: "The ID of the branch location",
    example: 1,
  })
  @ApiParam({
    name: "skuId",
    type: Number,
    description: "The ID of the SKU",
    example: 42,
  })
  @ApiResponse({ status: 200, description: "SKU stock retrieved successfully" })
  getSkuStockAtBranch(
    @Param("locationId", ParseIntPipe) locationId: number,
    @Param("skuId", ParseIntPipe) skuId: number
  ) {
    return this.branchStockService.getSkuStockAtBranch(locationId, skuId);
  }
}
