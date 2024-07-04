import { PanelComponent } from '../components/panel/panel.component';
import { Controls } from '../helpers';
import { Question } from './question';
import { Page } from './page';
import { FormEngineComponent } from '../typing/form-engine-component';
import {
  QuestionSchema,
  PanelSchema,
  DynamicComponent,
} from '../abstractions';
import { ElementManager } from './element-manager';

export class Panel
  extends ElementManager<Question, Page, PanelSchema>
  implements
    DynamicComponent<PanelComponent>
{
  component!: FormEngineComponent<PanelComponent>;
  type: Controls;

  constructor(schema: PanelSchema, parent: Page) {
    super(schema);
    this.type = Controls.Panel;
  }

  addSchemaElement(element: QuestionSchema): void {
    const question = new Question(element, this);
    this.elements.push(question);
  }

  checkAndUpdate(): void {
    this.elements.forEach((question: Question) => {
      if (!question.hasInjected() && this.hasInjected()) {
        this.component.instance.createComponent(question);
        this.component.instance.appendToView(question);
        this.component.changeDetectorRef.markForCheck();
      }

      question.checkAndUpdate();
    });
  }
}