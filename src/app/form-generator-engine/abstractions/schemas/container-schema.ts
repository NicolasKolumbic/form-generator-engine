import { Schema } from './base/schema';

export interface ContainerSchema<TChild> extends Schema {
    elements: TChild[];
}