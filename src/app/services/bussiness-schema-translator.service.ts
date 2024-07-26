import { Injectable } from '@angular/core';
import { SchemaFactory } from '@form-generator-engine/abstractions/public';
import { FormSchema } from '@form-generator-engine/abstractions/schemas';
import { DynamicForm } from '@form-generator-engine/composite-pattern';

@Injectable()
export class BussinessSchemaTranslatorService implements SchemaFactory<JSONObject>{

  constructor() { }
  build(schema: JSONObject, form?: DynamicForm | undefined): FormSchema {
    return schema as unknown as FormSchema;
  }

}
