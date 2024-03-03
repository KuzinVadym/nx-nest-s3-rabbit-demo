import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { TAsset } from 'assets-interfaces';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class Asset implements TAsset {
  @Prop({ type: SchemaTypes.ObjectId })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: Object, required: true })
  metadata?: Record<string, unknown>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const AssetsSchema = SchemaFactory.createForClass(Asset);