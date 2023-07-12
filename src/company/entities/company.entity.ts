import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  readonly name: string;

  @Prop({ unique: true, required: true })
  readonly email: string;

  @Prop({ required: true })
  password: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
