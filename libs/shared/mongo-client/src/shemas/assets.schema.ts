import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from 'mongo-client';

@Schema({ versionKey: false })
export class Asset extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: Object, required: true })
  metadata: Record<string, any>;
}

export const AssetsSchema = SchemaFactory.createForClass(Asset);