// import { Controller, Post, Body, Get } from "@nestjs/common";
// import { ReorderAlertService } from "./reorder-alert.service";
// import { SetReorderThresholdDto } from "./dto/set-reorder-threshold.dto";

// @Controller("reorder-alert")
// export class ReorderAlertController {
//   constructor(private reorderAlertService: ReorderAlertService) {}

//   @Post("set-threshold")
//   setThreshold(@Body() dto: SetReorderThresholdDto) {
//     return this.reorderAlertService.setReorderThreshold(dto);
//   }

//   @Get("check-alerts")
//   checkAlerts() {
//     return this.reorderAlertService.checkAndTriggerAlerts();
//   }

//   @Get()
//   getAll() {
//     return this.reorderAlertService.getAllAlerts();
//   }
// }

import { Controller, Post, Body, Get } from "@nestjs/common";
import { ReorderAlertService } from "./reorder-alert.service";
import { SetReorderThresholdDto } from "./dto/set-reorder-threshold.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReorderAlert } from "./entities/reorder-alert.entity";

@ApiTags("Reorder Alert")
@Controller("reorder-alert")
export class ReorderAlertController {
  constructor(private reorderAlertService: ReorderAlertService) {}

  @Post("set-threshold")
  @ApiOperation({ summary: "Set reorder threshold for a SKU" })
  @ApiResponse({
    status: 201,
    description: "Threshold set successfully",
    type: ReorderAlert,
  })
  setThreshold(@Body() dto: SetReorderThresholdDto) {
    return this.reorderAlertService.setReorderThreshold(dto);
  }

  @Get("check-alerts")
  @ApiOperation({ summary: "Check and trigger reorder alerts" })
  @ApiResponse({
    status: 200,
    description: "Returns alerts that were triggered",
    type: [ReorderAlert],
  })
  checkAlerts() {
    return this.reorderAlertService.checkAndTriggerAlerts();
  }

  @Get()
  @ApiOperation({ summary: "Get all reorder alerts" })
  @ApiResponse({
    status: 200,
    description: "Returns all reorder alerts",
    type: [ReorderAlert],
  })
  getAll() {
    return this.reorderAlertService.getAllAlerts();
  }
}
