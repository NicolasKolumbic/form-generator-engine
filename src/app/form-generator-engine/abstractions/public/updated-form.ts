import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { PageSchema, PanelSchema, QuestionSchema } from '../schemas';

export interface UpdatedForm {
  value: JSONValue;
  updatedQuestion: QuestionSchema;
  questions: QuestionSchema[];
  panel: PanelSchema;
  page: PageSchema;
  questionMetadata?: JSONValue;
  form: DynamicForm;
}
