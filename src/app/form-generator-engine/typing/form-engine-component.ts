import { ComponentRef } from '@angular/core';

export type FormEngineComponent<TComponent> = InstanceType<
  typeof ComponentRef<TComponent>
> &
  TComponent;
