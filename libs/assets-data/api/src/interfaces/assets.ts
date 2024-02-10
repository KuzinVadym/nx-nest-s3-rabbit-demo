import { Result } from 'neverthrow';
import { ObjectId } from 'mongodb'

export type TAssets = {
    _id: ObjectId
    name: string;
    category: string;
    metadata: Record<string, any>;
}

export type TAssetsWithSignedURL = {
    _id: ObjectId
    name: string;
    category: string;
    assetUrl: string;
    metadata: Record<string, any>;
}

export type TGetAssetsResult = Result<TAssetsWithSignedURL[], Error>
