import { Result } from 'neverthrow';
import { TAsset } from 'assets-interfaces';

export type TDownloadLinkInputV1 = {
    category: string;
    url: string;
}

export type TDownloadLinkResult = Result<{
    status: string
}, Error>


export type TGetAssetsResult = Result<TAsset[], Error>