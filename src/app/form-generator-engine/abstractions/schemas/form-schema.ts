import { PageSchema } from './page-schema';
import { Schema } from './base/schema';

export interface FormSchema extends Schema {
  elements: PageSchema[];
}
