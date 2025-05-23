import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sku } from "../../shared/database/entities/sku.entity";
import { CreateSkuDto } from "./dto/create-sku.dto";
import { UpdateSkuDto } from "./dto/update-sku.dto";

@Injectable()
export class SkuService {
  constructor(
    @InjectRepository(Sku)
    private skuRepository: Repository<Sku>
  ) {}

  async create(createSkuDto: CreateSkuDto) {
    const existing = await this.skuRepository.findOne({
      where: { code: createSkuDto.code },
    });
    if (existing) throw new ConflictException("SKU code already exists");

    const sku = this.skuRepository.create(createSkuDto);
    return await this.skuRepository.save(sku);
  }

  async findAll() {
    return await this.skuRepository.find();
  }

  async findOne(id: number) {
    const sku = await this.skuRepository.findOne({ where: { id } });
    if (!sku) throw new NotFoundException("SKU not found");
    return sku;
  }

  async update(id: number, updateSkuDto: UpdateSkuDto) {
    const sku = await this.findOne(id);
    Object.assign(sku, updateSkuDto);
    return await this.skuRepository.save(sku);
  }

  // async remove(id: number) {
  //   const sku = await this.findOne(id);
  //   return await this.skuRepository.remove(sku);
  // }

  async remove(id: number) {
    const sku = await this.findOne(id);

    // Check if SKU has related stocks
    const relatedStocks = await this.skuRepository.count({ where: { id } });
    if (relatedStocks > 0) {
      throw new BadRequestException(
        "Cannot delete SKU with existing stock entries"
      );
    }

    return await this.skuRepository.remove(sku);
  }
}
