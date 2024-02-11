import { Result } from 'neverthrow';
import { ObjectId } from 'mongodb';
import { AxiosResponse } from 'axios';

export type TDownloadLinkInputV1 = {
    category: string;
    url: string;
}

export type TDownloadLinkResult = Result<{
    status: string
}, Error>

export type TAssets = {
    _id: ObjectId
    name: string;
    category: string;
    assetUrl: string;
    metadata: Record<string, any>;
}

export type TGetAssetsResult = Result<TAssets[], Error>