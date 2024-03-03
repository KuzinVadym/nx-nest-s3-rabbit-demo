import { Injectable, Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { PinoLogger } from 'nestjs-pino';

import { Asset } from '../shemas/assets.schema';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class AssetsMongoRepository extends AbstractRepository<Asset> {

  constructor(
    logger: PinoLogger,
    @InjectModel(Asset.name) model: Model<Asset>,
  ) {
    super(logger, model, 'Asset');
  }
}