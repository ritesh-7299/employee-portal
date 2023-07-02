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

  @Exclude()
  @Prop({ required: true })
  password: string;

  constructor(partial: Partial<CompanyDocument>) {
    Object.assign(this, partial);
  }
}

export const CompanySchema = SchemaFactory.createForClass(Company);
