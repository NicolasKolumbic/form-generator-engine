import { Schema } from "./schema";

export interface ContainerSchema<TChild> extends Schema {
    elements: TChild[];
}