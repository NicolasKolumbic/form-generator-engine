import { PageSchema } from './page-schema';
import { Schema } from './schema';

export interface FormSchema extends Schema {
  elements: PageSchema[];
}
