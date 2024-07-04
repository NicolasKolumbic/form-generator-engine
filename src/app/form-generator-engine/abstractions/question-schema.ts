import { Controls } from '../helpers/controls.enum';
import { QuestionControlSchema } from './question-control-schema';
import { Schema } from './schema';

export interface QuestionSchema extends Schema {
  questionText: string;
  questionId: number;
  componentType: Controls;
  elements: QuestionControlSchema[];
  disabled?: boolean;
  value?: JSONValue;
}
