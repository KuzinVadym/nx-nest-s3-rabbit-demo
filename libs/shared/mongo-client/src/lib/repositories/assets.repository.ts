import { Injectable, Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

import { Asset } from '../shemas/assets.schema';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class AssetsRepository extends AbstractRepository<Asset> {
  protected readonly logger = new Logger(AssetsRepository.name);

  constructor(
    @InjectModel(Asset.name) model: Model<Asset>,
    @InjectConnection() connection: Connection,
  ) {
    super(model, connection, 'Asset');
  }
}