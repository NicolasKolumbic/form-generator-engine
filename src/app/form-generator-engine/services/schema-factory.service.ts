import { Injectable } from '@angular/core';
import { DynamicForm } from '../composite-pattern';
import { SchemaFactory } from '@form-generator-engine/abstractions/public';
import { FormSchema } from '@form-generator-engine/abstractions/schemas';

@Injectable()
export class SchemaFactoryService implements SchemaFactory<JSONValue> {
  build<JSONValue>(_schema: JSONValue, _form?: DynamicForm): FormSchema {
    throw new Error('No factory was implemented to solve the scheme.');
  }
}
