import { Result } from 'neverthrow'

export type TDownloadLinkPayloadV1 = {
    name: string;
    url: string;
}

export type TDownloadLinkResult = Result<{
    status: string
}, Error>

export type TDownloadAssetResult = Result<Buffer, Error>