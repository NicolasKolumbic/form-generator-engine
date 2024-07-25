import { Controls } from "@form-generator-engine/helpers";
import { MetadataSchema } from "./metadata-schema";

export interface ComponentSchema extends MetadataSchema {
    componentType: Controls
}