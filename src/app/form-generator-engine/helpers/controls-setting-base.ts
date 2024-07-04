import { CheckboxDefaultComponent } from '@form-generator-engine/components/checkbox-default/checkbox-default.component';
import { ControlsSetting } from '../abstractions/controls-setting';
import { FormComponent } from '../components/form/form.component';
import { PageComponent } from '../components/page/page.component';
import { PanelComponent } from '../components/panel/panel.component';
import { QuestionComponent } from '../components/question/question.component';
import { ComboboxDefaultComponent } from '@form-generator-engine/components/combobox-default/combobox-default.component';
import { SwitchDefaultComponent } from '@form-generator-engine/components/switch-default/switch-default.component';
import { TextfieldDefaultComponent } from '@form-generator-engine/components/textfield-default/textfield-default.component';

export const controlsSettingBase: ControlsSetting = {
  form: FormComponent,
  page: PageComponent,
  panel: PanelComponent,
  question: QuestionComponent,
  checkbox: CheckboxDefaultComponent,
  combobox: ComboboxDefaultComponent,
  switch: SwitchDefaultComponent,
  textfield: TextfieldDefaultComponent
};
