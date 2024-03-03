import { Result } from 'neverthrow';

import { TAsset } from 'assets-interfaces';

export type TAssetsWithSignedURL = TAsset & {
    assetUrl: string;
}

export type TUpdatedAssetsWithSignedUrl = Promise<Result<TAssetsWithSignedURL[], Error>>

export type TFindAssetsResult = Promise<Result<TAssetsWithSignedURL[], Error>>
