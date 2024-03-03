import { Result } from 'neverthrow';

export type TQueryPayload<T> = Partial<T>
export type TQueryOneResult<T> = Promise<Result<T | null, Error>>
export type TQueryResult<T> = Promise<Result<T[], Error>>

export type TCreatePayload<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' >
export type TUpdatePayload<T> = Required<{id: string}> & Partial<T>
export type TDeletePayload<T> = Required<{id: string}> & Partial<T>

export type TMutateResult<T> = Promise<Result<T, Error>>

export interface IRepository<T> {
    find: (findPayload: TQueryPayload<T>) => TQueryResult<T>,
    findOne: (findOnePayload: TQueryPayload<T>) => TQueryOneResult<T>,
    create: (createPayload: TCreatePayload<T>) => TMutateResult<T>,
    update: (updatePayload: TUpdatePayload<T>) => TMutateResult<T>,
    delete: (deletePayload: TDeletePayload<T>) => TMutateResult<T>,
}