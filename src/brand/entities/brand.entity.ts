import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true })
  readonly name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'companies' })
  readonly company_id: Types.ObjectId;
}

const BrandSchema = SchemaFactory.createForClass(Brand);
BrandSchema.index({ name: 1, company_id: 1 }, { unique: true });
export { BrandSchema };
