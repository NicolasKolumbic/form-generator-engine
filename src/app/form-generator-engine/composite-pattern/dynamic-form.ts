import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormComponent } from '../components/form/form.component';
import { Page } from './page';
import { Question } from './question';
import { Panel } from './panel';
import { QuestionControl } from './question-control';
import { FormEngineComponent } from '../typing/form-engine-component';
import { Controls } from '../helpers';
import {
  DynamicComponent,
  FormSchema,
  PageSchema,
  QuestionSchema,
  UpdateField,
  UpdatedForm,
} from '../abstractions';
import { ElementManager } from './element-manager';

export class DynamicForm
  extends ElementManager<Page, null, FormSchema>
  implements DynamicComponent<FormComponent>
{
  schema: FormSchema;
  component!: FormEngineComponent<FormComponent>;
  type!: Controls;
  update: Subject<UpdatedForm>;

  private value: JSONValue = {};

  constructor(form: FormSchema) {
    super(form, null);
    this.schema = form;
    this.update = new Subject<UpdatedForm>();
    this.elements = [];
    
    form.elements.forEach((pageSchema: PageSchema, index: number) => {
      const page = new Page(pageSchema, this);

      if (index > 0) {
        page.setPrevious(this.elements[index - 1])
        const previousNode = this.elements[index - 1];
        previousNode.setNext(page);
      }

      if (index === 0) {
        this.setChild(page)
      }

      this.elements.push(page);
    });
    
    
  }

  getValue(): JSONValue {
    return this.value;
  }

  updateValue(updatedValue: UpdateField, question: QuestionControl): void {
    Object.defineProperty(this.value, updatedValue.name, {
      value: updatedValue.value,
      writable: true,
    });

    this.update.next({
      value: this.value,
      updatedQuestion: this.getQuestionSchema(question.parent),
      questions: this.getAllQuestionSchemas(),
      page: question!.parent!.parent!.parent!.getSchema(['name']),
      panel: question!.parent!.parent!.getSchema(['name']),
      questionMetadata: question.metadata(),
      form: this
    } as UpdatedForm);
  }


  addSchemaElement(page: PageSchema): Page[] {
    const newPage = new Page(page, this);
    this.elements.push(newPage);
    return this.elements;
  }

  checkAndUpdate(): void {
    this.elements.forEach((page: Page) => {
      if (!page.hasInjected()) {
        /*this.component.instance.createComponent(page);
        this.component.instance.appendToView(page);
        this.component.changeDetectorRef.markForCheck();*/
      }
      page.checkAndUpdate();
    });
  }

  addControl(name: string, control: FormControl): void {
    (this.component.instance as unknown as FormComponent).addControl(
      name,
      control
    );
  }

  getAllQuestionSchemas(): QuestionSchema[] {
    let questions: Question[] = [];

    this.elements.forEach((page: Page) => {
      page.elements.forEach((panel: Panel) => {
        questions = questions.concat(panel.elements);
      });
    });

    return questions.map((question: Question) => {
      return this.getQuestionSchema(question);
    });
  }

  getQuestionSchema(question: Question): QuestionSchema {
    const schema = question.getSchema<QuestionSchema>(['questionId', 'name']);
    schema.value = question.getValue();
    return schema;
  }

  clear(): void {
    this.component.destroy();
  }
}
