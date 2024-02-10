import { AxiosError } from 'axios';
import { Result } from 'neverthrow';

export type TDownloadLinkPayloadV1 = {
    name: string;
    url: string;
}

export type TDownloadLinkResultV1 = Result<unknown, AxiosError>;