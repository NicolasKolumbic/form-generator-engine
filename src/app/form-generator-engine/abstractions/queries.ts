import { DynamicForm, Page, Panel, Question } from "@form-generator-engine/composite-pattern";
import { PageSchema, PanelSchema, QuestionSchema, QuestionControlSchema } from "./schemas";

export interface Queries {
    addPageSchemaByQuery(query: JSONObject, page: PageSchema): DynamicForm;
    addPanelSchemaByQuery(query: JSONObject, panel: PanelSchema): Page;
    addQuestionSchemaByQuery(query: JSONObject, question: QuestionSchema): Panel;
    addQuestionControlSchemaByQuery(query: JSONObject, questionControl: QuestionControlSchema): Question;
}