import { ComponentSchema } from './component-schema';

export interface Schema extends ComponentSchema {
  name: string;
  title?: string;
}
