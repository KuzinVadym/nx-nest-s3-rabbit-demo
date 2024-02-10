import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractSchema } from './abstract.schema';

export abstract class AbstractRepository<TAsset extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TAsset>,
    private readonly connection: Connection,
  ) {}

  async create(
    Asset: Omit<TAsset, '_id'>,
    options?: SaveOptions,
  ): Promise<TAsset> {
    const createdAsset = new this.model({
      ...Asset,
      _id: new Types.ObjectId(),
    });
    return (
      await createdAsset.save(options)
    ).toJSON() as unknown as TAsset;
  }

  async findOne(filterQuery: FilterQuery<TAsset>): Promise<TAsset> {
    const asset = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!asset) {
      this.logger.warn('Asset not found with filterQuery', filterQuery);
      throw new NotFoundException('Asset not found.');
    }

    return asset as TAsset;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TAsset>,
    update: UpdateQuery<TAsset>,
  ) {
    const Asset = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!Asset) {
      this.logger.warn(`Asset not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Asset not found.');
    }

    return Asset;
  }

  async upsert(
    filterQuery: FilterQuery<TAsset>,
    Asset: Partial<TAsset>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, Asset, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TAsset>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
