import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from './entities/brand.entity';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @Inject(REQUEST) private request: Request,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    try {
      createBrandDto['company_id'] = this.request['user']._id;
      await this.brandModel.create(createBrandDto);
      return { success: true, message: 'Brand created successfully' };
    } catch (error) {
      if (error.code == '11000') {
        return { success: false, message: 'This brand is already exists' };
      }
    }
  }

  async findAll() {
    const data = await this.brandModel.find({
      company_id: this.request['user']._id,
    });
    return { data: data, success: true };
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return await this.brandModel.findByIdAndUpdate(
      id,
      { ...updateBrandDto },
      { new: true },
    );
  }

  async remove(id: string) {
    try {
      const data = await this.brandModel.findByIdAndDelete(id);
      if (!data) {
        return { success: false, message: 'This brand is not deleted' };
      }
      return { success: false, message: 'This brand is deleted successfully' };
    } catch (error) {
      return { success: false, message: 'This brand is not deleted' };
    }
  }
}
