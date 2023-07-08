import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, ref: 'companies', type: Types.ObjectId })
  company_id: Types.ObjectId;

  @Prop({ required: false, default: false })
  isVerified: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
