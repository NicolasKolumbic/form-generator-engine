import { ComponentSchema } from './component-schema';

export interface Schema extends ComponentSchema {
  name: string;
  isVisible: boolean;
  title?: string;
}
