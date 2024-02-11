import { Result } from 'neverthrow';
import { AxiosError, AxiosResponse } from 'axios';
import { ObjectId } from 'mongodb'

export type TGetAssetsResult = Result<AxiosResponse, AxiosError>