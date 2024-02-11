export type TCreateAssetEventPayload = {
    name: string;
    category: string;
    metadata: Record<string, unknown>;
}