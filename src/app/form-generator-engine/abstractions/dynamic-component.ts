import { Controls } from '../helpers';
import { FormEngineComponent } from '../typing/form-engine-component';

export interface DynamicComponent<TComponent> {
  component: FormEngineComponent<TComponent>;
  type: Controls;
}
