import { Result } from 'neverthrow';
import { AxiosError, AxiosResponse } from 'axios';

export type TGetAssetsResult = Result<AxiosResponse, AxiosError>