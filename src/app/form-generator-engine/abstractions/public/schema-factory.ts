import { DynamicForm } from '../../composite-pattern/dynamic-form';
import { FormSchema } from '../schemas/form-schema';

export interface SchemaFactory<T> {
  build(schema: T, form?: DynamicForm): FormSchema;
}
