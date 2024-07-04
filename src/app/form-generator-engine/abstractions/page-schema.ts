import { PanelSchema } from './panel-schema';
import { Schema } from './schema';

export interface PageSchema extends Schema {
  elements: PanelSchema[];
}
