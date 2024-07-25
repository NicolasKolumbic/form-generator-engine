import { QuestionSchema } from './question-schema';
import { Schema } from './base/schema';

export interface PanelSchema extends Schema {
  elements: QuestionSchema[];
}
