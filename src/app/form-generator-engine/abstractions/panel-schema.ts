import { QuestionSchema } from './question-schema';
import { Schema } from './schema';

export interface PanelSchema extends Schema {
  elements: QuestionSchema[];
}
