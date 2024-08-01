import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormComponent } from '../components/form/form.component';
import { Page } from './page';
import { Question } from './question';
import { Panel } from './panel';
import { QuestionControl } from './question-control';
import { FormEngineComponent } from '../typing/form-engine-component';
import { Controls } from '../helpers';

import { ElementManager } from './element-manager';
import { DynamicComponent } from '@form-generator-engine/abstractions/internal';
import { UpdatedForm, UpdateField } from '@form-generator-engine/abstractions/public';
import { FormSchema, PageSchema, QuestionSchema } from '@form-generator-engine/abstractions/schemas';
import { BaseElement } from './base-element';
import { TreeDataStructure } from './tree-data-structure';

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
        this.setFirstChild(page)
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
      updatedQuestion: this.getQuestionSchema(question.parent, true),
      questions: this.getAllQuestionSchemas(),
      page: question!.parent!.parent!.parent!.getSchema(['name']),
      panel: question!.parent!.parent!.getSchema(['name']),
      questionMetadata: question.metadata(),
      form: this
    } as UpdatedForm);
  }

  queryArray(fn: (element: TreeDataStructure) => boolean, element?: any) {
    let result = false;
    let nodes: any[] = element ? element.elements : this.elements;
    let counter: number = 0;
    let value;
    while(counter < nodes.length && value === undefined) {
      result = fn(nodes[counter]);
      if(result) {
        value = nodes[counter];
      } else {
        this.queryArray(fn, nodes[counter]);
      }
      counter++;
    }

    return value;
  }


  addSchemaElement(page: PageSchema): void {
    const newPage = new Page(page, this);
    const previousNode: Page | null = this.elements.length > 1 ? this.elements[this.elements.length - 1]: null;
    if (previousNode) {
      newPage.setPrevious(previousNode);
    }
    this.elements.push(newPage);
    this.component.instance.factory.generateView(newPage);
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
      return this.getQuestionSchema(question, true);
    });
  }

  getQuestionSchema(question: Question, includeMetadata: boolean): QuestionSchema {
    const schema = question.getSchema<QuestionSchema>(['questionId', 'name']);
    schema.value = question.getValue();
    if (includeMetadata) {
      schema.metadata = question.metadata() as JSONObject;
    }
    return schema;
  }

  clear(): void {
    this.component.destroy();
  }
}
