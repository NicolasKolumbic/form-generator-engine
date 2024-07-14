import { TreeDataStructure } from '@form-generator-engine/composite-pattern/tree-data-structure';
import {
    PageSchema,
    PanelSchema,
    QuestionControlSchema,
    QuestionSchema,
    Schema,
  } from '../abstractions';
  import { ContainerSchema } from '../abstractions/container-schema';
  import {
    BaseElement,
    DynamicForm,
    Page,
    Panel,
    Question,
    QuestionControl,
  } from '../composite-pattern';
  import { Controls } from './controls.enum';
  
  export function factory(
    element: Schema,
    parent: BaseElement
  ): TreeDataStructure {
    const type: Controls = (element as ContainerSchema<Schema>).componentType;
    let instance;
    switch (type) {
      case Controls.Page:
        instance = new Page(
          element as PageSchema,
          parent as DynamicForm
        );
        break;
      case Controls.Panel:
        instance = new Panel(element as PanelSchema, parent as Page);
        break;
      case Controls.Question:
        instance = new Question(
          element as QuestionSchema,
          parent as Panel
        );
        break;
      default:
        instance = new QuestionControl(
          element as QuestionControlSchema,
          parent as Question
        );
        break;
    }
    return instance as TreeDataStructure;
  }