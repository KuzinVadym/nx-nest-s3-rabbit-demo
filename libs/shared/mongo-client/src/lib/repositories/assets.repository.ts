import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'mongo-client';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Asset } from '../shemas/assets.schema';

@Injectable()
export class AssetsRepository extends AbstractRepository<Asset> {
  protected readonly logger = new Logger(AssetsRepository.name);

  constructor(
    @InjectModel(Asset.name) orderModel: Model<Asset>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}