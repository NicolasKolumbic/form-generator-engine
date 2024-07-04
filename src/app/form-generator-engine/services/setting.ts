import { Injectable, Type } from '@angular/core';
import { ControlsSetting } from '../abstractions';

@Injectable()
export class Setting {
  overwrittenControls?: ControlsSetting;
  schemaFactory?: Type<unknown> | undefined;
}
