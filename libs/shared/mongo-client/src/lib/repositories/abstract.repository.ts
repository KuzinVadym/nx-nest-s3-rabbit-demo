import { NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { err, ok } from 'neverthrow';
import {
  FilterQuery,
  Model,
  Types,
} from 'mongoose';

import { 
  IRepository,
  TCreatePayload,
  TDeletePayload,
  TMutateResult,
  TQueryOneResult,
  TQueryPayload,
  TQueryResult,
  TUpdatePayload
} from '../interfaces';

export abstract class AbstractRepository<T> implements IRepository<T> {

  constructor(
    private readonly logger: PinoLogger,
    private readonly model: Model<T>,
    private readonly modelName: string,
  ) {}

  async find(findPayload: TQueryPayload<T>): TQueryResult<T> {
    try {
      const findResult = await this.model.find({}, {}, { lean: true }) as T[];

      console.log('findResult');
      console.log(findResult);

      return ok(findResult);
    } catch (error) {
      return this.returnError(error, 'create');
    }
  }

  async findOne(filterQuery: FilterQuery<T>): TQueryOneResult<T> {

    try {
      const findOneResult = await this.model.findOne(filterQuery, {}, { lean: true });

      if (!findOneResult) {
        this.logger.warn(`${this.modelName} not found with filterQuery`, filterQuery);
      }
  
      return ok(findOneResult as T | null);
    } catch (error) {
      return this.returnError(error, 'create');
    }
  }

  async create(
    createPayload: TCreatePayload<T>
  ): TMutateResult<T> {
    try {
      const toCreate = new this.model({
        ...createPayload,
        id: new Types.ObjectId(),
      });
  
      const createdResult = await toCreate.save();

      return ok(createdResult as T);
    } catch (error) {
      return this.returnError(error, 'create');
    }
  }

  async update(
    updatePayload: TUpdatePayload<T>
  ): TMutateResult<T> {
    try {
      const { id } = updatePayload

      const updateResult = await this.model.findOneAndUpdate({ where: { id } }, updatePayload, {
        lean: true,
        new: true,
      });
  
      if (!updateResult) {
        this.logger.warn(`${this.modelName} not found with id:`, id);
        throw new NotFoundException(`${this.modelName} not found.`);
      }
  
      return ok(updateResult as T);
    } catch (error) {
      return this.returnError(error, 'update');
    }
  }

  async delete(
    deletePayload: TDeletePayload<T>
  ): TMutateResult<T> {
    try {
      const { id } = deletePayload

      const deleteResult = await this.model.findOneAndDelete({ where: { id } }, {
        lean: true,
        new: true,
      });
  
      if (!deleteResult) {
        this.logger.warn(`${this.modelName} not found with id:`, id);
        throw new NotFoundException(`${this.modelName} not found.`);
      }
  
      return ok(deleteResult as T);
    } catch (error) {
      return this.returnError(error, 'update');
    }
  }

  private returnError = (error: Error | unknown, method: string) => {
    if (error instanceof Error) {
      this.logger.error(error.message);
    }
    return error instanceof Error
      ? err(error)
      : err(Error(
        `Something went wrong during ${method}`,
      ));
  };
}
