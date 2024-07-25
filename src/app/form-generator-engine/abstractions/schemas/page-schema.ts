import { Schema } from './base/schema';
import { PanelSchema } from './panel-schema';

export interface PageSchema extends Schema {
  elements: PanelSchema[];
}
