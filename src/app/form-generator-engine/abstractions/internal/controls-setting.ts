import { Type } from '@angular/core';
import { QuestionBaseComponent } from '../public/question-base-component';
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
  number?: Type<QuestionBaseComponent>;
  maskedinput?: Type<QuestionBaseComponent>;
  datepicker?: Type<QuestionBaseComponent>;
}
