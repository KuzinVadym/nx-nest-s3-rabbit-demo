import { Result } from 'neverthrow';
import { ObjectId } from 'mongodb'

export type TAssets = {
    _id: ObjectId
    name: string;
    category: string;
    metadata: Record<string, unknown>;
}

export type TAssetsWithSignedURL = {
    _id: ObjectId
    name: string;
    category: string;
    assetUrl: string;
    metadata: Record<string, unknown>;
}

export type TGetAssetsResult = Result<TAssetsWithSignedURL[], Error>
