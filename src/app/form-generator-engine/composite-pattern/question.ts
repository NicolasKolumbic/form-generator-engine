import { Controls } from '../helpers/controls.enum';
import { Panel } from './panel';
import { QuestionControl } from './question-control';
import { QuestionComponent } from '../components/question/question.component';
import { FormEngineComponent } from '../typing/form-engine-component';
import {
  QuestionSchema,
  QuestionControlSchema,
  DynamicComponent,
} from '../abstractions';
import { ElementManager } from './element-manager';

export class Question
  extends ElementManager<QuestionControl, Panel, QuestionSchema>
  implements DynamicComponent<QuestionComponent>
{
  component!: FormEngineComponent<QuestionComponent>;
  type: Controls;
  disabled: boolean;
  questionId: number;
  questionText!: string;

  constructor(
    schema: QuestionSchema,
    parent: Panel
  ) {
    super(schema, parent);
    this.type = schema.componentType;
    this.disabled = schema.disabled ?? false;
    this.questionId = schema.questionId;
    this.questionText = schema.questionText;
  }

  addSchemaElement(element: QuestionControlSchema): void {
    const control = new QuestionControl(element, this);
    this.elements.push(control);
  }

  checkAndUpdate(): void {
    this.elements.forEach((control: QuestionControl) => {
      if (!control.hasInjected() && this.hasInjected()) {
        /*this.component.instance.createComponent(control);
        this.component.instance.transform(control);
        this.component.instance.appendToView(control);
        this.component.changeDetectorRef.markForCheck();*/
      }
    });
  }

  getValue(): JSONObject {
    return this.elements.reduce(
      (result: JSONObject, control: QuestionControl) => {
        result = {
          ...result,
          value: control.getValue(),
          name: control.name,
        };
        return result;
      },
      {}
    );
  }
}
