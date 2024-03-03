import { Result } from 'neverthrow';

export type TAsset = {
    id: string;
    name: string;
    category: string;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export type TQueryPayload = Partial<TAsset>
export type TQueryOneAssetResult = Promise<Result<TAsset | null, Error>>
export type TQueryAssetResult = Promise<Result<TAsset[], Error>>

export type TCreateAssetPayload = Omit<TAsset, 'id' | 'createdAt' | 'updatedAt' >
export type TUpdateAssetPayload = Required<Pick<TAsset, 'id'>> & Partial<Omit<TAsset, 'id' >>
export type TDeleteAssetPayload = Pick<TAsset, 'id'>

export type TMutateAssetResult = Promise<Result<TAsset, Error>>

export interface IAssetsRepository {
    find: (findAssetPayload: TQueryPayload) => TQueryAssetResult,
    findOne: (findOneAssetPayload: TQueryPayload) => TQueryOneAssetResult,
    create: (createAssetPayload: TCreateAssetPayload) => TMutateAssetResult,
    update: (updateAssetPayload: TUpdateAssetPayload) => TMutateAssetResult,
    delete: (deleteAssetPayload: TDeleteAssetPayload) => TMutateAssetResult,
}