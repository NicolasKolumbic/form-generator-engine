import { Controls } from '../../helpers/controls.enum';
import { Schema } from './base/schema';

export interface QuestionControlSchema extends Schema {
  componentType: Controls;
  value?: JSONValue;
  disabled?: boolean;
  label?: string;
  text?: string;
  options?: JSONObject[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  placeholder?: string;
  mask?: string;
}
