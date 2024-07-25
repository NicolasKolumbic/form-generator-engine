export interface Metadata {
  hasMetadata(): boolean;
  metadata(key?: string): JSONValue | null | undefined;
}
