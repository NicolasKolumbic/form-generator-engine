import { Injectable } from '@angular/core';
import { DynamicForm } from '../composite-pattern';
import { FormSchema, SchemaFactory } from '../abstractions';

@Injectable()
export class SchemaFactoryService implements SchemaFactory<JSONValue> {
  build<JSONValue>(_schema: JSONValue, _form?: DynamicForm): FormSchema {
    throw new Error('No factory was implemented to solve the scheme.');
  }
}
