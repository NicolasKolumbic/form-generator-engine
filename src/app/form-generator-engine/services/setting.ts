import { Injectable, Type } from '@angular/core';
import { ControlsSetting } from '@form-generator-engine/abstractions/internal';

@Injectable()
export class Setting {
  overwrittenControls?: ControlsSetting;
  schemaFactory: Type<unknown> | undefined;
}
