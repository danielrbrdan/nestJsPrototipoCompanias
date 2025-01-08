import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Company } from './entity/company.entity';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';

@Controller('company')
export class CompanyController {
  constructor(protected readonly service: CompanyService) {}

  @Post()
  async create(@Body() createDto: CompanyCreateDto): Promise<Company> {
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: CompanyUpdateDto,
  ): Promise<Company> {
    return this.service.update(id, updateDto);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Company> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
