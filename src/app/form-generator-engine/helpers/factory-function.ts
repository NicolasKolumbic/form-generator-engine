import {
    PageSchema,
    PanelSchema,
    QuestionControlSchema,
    QuestionSchema,
    Schema,
  } from '../abstractions';
  import { ContainerSchema } from '../abstractions/container-schema';
  import {
    DynamicForm,
    Page,
    Panel,
    Question,
    QuestionControl,
  } from '../composite-pattern';
  import { Controls } from './controls.enum';
  
  export function factory<TElement, TParent>(
    element: Schema,
    parent: TParent
  ): TElement | undefined {
    const type = (element as ContainerSchema<Schema>).componentType;
    let instance;
    switch (type) {
      case Controls.Page:
        instance = new Page(
          element as PageSchema,
          parent as DynamicForm
        ) as TElement;
        break;
      case Controls.Panel:
        instance = new Panel(element as PanelSchema, parent as Page) as TElement;
        break;
      case Controls.Question:
        instance = new Question(
          element as QuestionSchema,
          parent as Panel
        ) as TElement;
        break;
      default:
        instance = new QuestionControl(
          element as QuestionControlSchema,
          parent as Question
        ) as TElement;
        break;
    }
    return instance;
  }