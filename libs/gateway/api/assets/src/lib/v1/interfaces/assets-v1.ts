import { Result } from 'neverthrow';

export type TDownloadLinkInputV1 = {
    name: string;
    url: string;
}

export type TDownloadLinkResult = Result<{
    status: string
}, Error>