import { Result } from 'neverthrow'

export type TDownloadLinkResult = Result<{
    status: string
}, Error>

export type TDownloadAssetResult = Result<Buffer, Error>