import { DynamicForm, Page, Panel, Question } from "@form-generator-engine/composite-pattern";
import { PanelSchema } from "./panel-schema";
import { QuestionControlSchema } from "./question-control-schema";
import { QuestionSchema } from "./question-schema";
import { PageSchema } from "./page-schema";

export interface Queries {
    addPageSchemaByQuery(query: JSONObject, page: PageSchema): DynamicForm;
    addPanelSchemaByQuery(query: JSONObject, panel: PanelSchema): Page;
    addQuestionSchemaByQuery(query: JSONObject, question: QuestionSchema): Panel;
    addQuestionControlSchemaByQuery(query: JSONObject, questionControl: QuestionControlSchema): Question;
}