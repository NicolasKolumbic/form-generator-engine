import { CheckboxDefaultComponent } from '@form-generator-engine/components/checkbox-default/checkbox-default.component';
import { ControlsSetting } from '../abstractions/internal/controls-setting';
import { FormComponent } from '../components/form/form.component';
import { PageComponent } from '../components/page/page.component';
import { PanelComponent } from '../components/panel/panel.component';
import { QuestionComponent } from '../components/question/question.component';
import { ComboboxDefaultComponent } from '@form-generator-engine/components/combobox-default/combobox-default.component';
import { SwitchDefaultComponent } from '@form-generator-engine/components/switch-default/switch-default.component';
import { TextfieldDefaultComponent } from '@form-generator-engine/components/textfield-default/textfield-default.component';
import { OnlyNumberComponent } from '@form-generator-engine/components/only-number/only-number.component';
import { MaskedInputDefaultComponent } from '@form-generator-engine/components/masked-input-default/masked-input-default.component';
import { DatepickerDefaultComponent } from '@form-generator-engine/components/datepicker-default/datepicker-default.component';

export const controlsSettingBase: ControlsSetting = {
  form: FormComponent,
  page: PageComponent,
  panel: PanelComponent,
  question: QuestionComponent,
  checkbox: CheckboxDefaultComponent,
  combobox: ComboboxDefaultComponent,
  switch: SwitchDefaultComponent,
  textfield: TextfieldDefaultComponent,
  number: OnlyNumberComponent,
  maskedinput: MaskedInputDefaultComponent,
  datepicker: DatepickerDefaultComponent
};
