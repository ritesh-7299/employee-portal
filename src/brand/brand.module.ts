import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
