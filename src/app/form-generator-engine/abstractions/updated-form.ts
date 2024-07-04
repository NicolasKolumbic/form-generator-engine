import { PageSchema } from './page-schema';
import { PanelSchema } from './panel-schema';
import { QuestionSchema } from './question-schema';

export interface UpdatedForm {
  value: JSONValue;
  updatedQuestion: QuestionSchema;
  questions: QuestionSchema[];
  panel: PanelSchema;
  page: PageSchema;
  questionMetadata?: JSONValue;
}
