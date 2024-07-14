import { Type } from '@angular/core';
import { QuestionBaseComponent } from './question-base-component';
import { FactoryComponent } from './factory-component';

export interface ControlsSetting {
  form?: Type<FactoryComponent>;
  page?: Type<FactoryComponent>;
  panel?: Type<FactoryComponent>;
  question?: Type<FactoryComponent>;
  textfield?: Type<QuestionBaseComponent>;
  checkbox?: Type<QuestionBaseComponent>;
  switch?: Type<QuestionBaseComponent>;
  combobox?: Type<QuestionBaseComponent>;
}
