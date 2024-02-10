import { AxiosError } from 'axios';
import { Result } from 'neverthrow';

export type TDownloadLinkPayloadV1 = {
    category: string;
    url: string;
}

export type TDownloadLinkResultV1 = Result<unknown, AxiosError>;