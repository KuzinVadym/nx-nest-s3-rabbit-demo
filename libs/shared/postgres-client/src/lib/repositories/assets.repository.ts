import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { err, ok } from 'neverthrow';

import { Assets } from '../entities';
import { 
    IAssetsRepository,
    TCreateAssetPayload,
    TDeleteAssetPayload,
    TMutateAssetResult,
    TQueryAssetResult,
    TQueryOneAssetResult,
    TQueryPayload,
    TUpdateAssetPayload
} from 'assets-interfaces';


@Injectable()
export class AssetsRepository implements IAssetsRepository
{
    constructor(
        private readonly logger: PinoLogger,
        @InjectRepository(Assets)
        private assetsRepository: Repository<Assets>,
    ){}

    async find(findAssetPayload: TQueryPayload): TQueryAssetResult {
        try {
            const findResult = await this.assetsRepository.find({where: findAssetPayload});

            return ok(findResult)              
        } catch (error) {
            return this.returnError(error, 'find');
        }
    };

    async findOne(findOneAssetPayload: TQueryPayload): TQueryOneAssetResult {
        try {
            const findResult = await this.assetsRepository.findOne({where: findOneAssetPayload});

            return ok(findResult)              
        } catch (error) {
            return this.returnError(error, 'findOne');
        }
    };

    async create(createAssetPayload: TCreateAssetPayload): TMutateAssetResult {
        try {
            const createResult = await this.assetsRepository.create(createAssetPayload);

            const saveResult = await this.assetsRepository.save(createResult);

            return ok(saveResult)              
        } catch (error) {
            return this.returnError(error, 'create');
        }
    };

    async update(updateAssetPayload: TUpdateAssetPayload): TMutateAssetResult {
        try {
            const {id, ...rest} = updateAssetPayload

            const findResult = await this.assetsRepository.update(id, rest);

            return ok(findResult.raw)              
        } catch (error) {
            return this.returnError(error, 'update');
        }
    };

    async delete(deleteAssetPayload: TDeleteAssetPayload): TMutateAssetResult {
        try {
            const { id } = deleteAssetPayload

            const findResult = await this.assetsRepository.delete(id);

            return ok(findResult.raw)              
        } catch (error) {
            return this.returnError(error, 'delete');
        }
    };

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