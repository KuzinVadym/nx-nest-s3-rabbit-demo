import { Result } from 'neverthrow'

export type TDownloadLinkResult = Result<{
    status: string
}, Error>

export type TGetSignedUrlResult = Result<string, Error>