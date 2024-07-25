import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormViewerComponent } from './components/form-viewer/form-viewer.component';
import { Setting } from './services/setting';
import { FormSessionService } from './services/form-session.service';
import { FormComponent } from './components/form/form.component';
import { PageComponent } from './components/page/page.component';
import { PanelComponent } from './components/panel/panel.component';
import { configurationSetter } from './helpers/configuration-setter';
import { SchemaFactoryService } from './services/schema-factory.service';
import { QuestionComponent } from './components/question/question.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SwitchDefaultComponent } from './components/switch-default/switch-default.component';
import { CheckboxDefaultComponent } from './components/checkbox-default/checkbox-default.component';
import { TextfieldDefaultComponent } from './components/textfield-default/textfield-default.component';
import { ComboboxDefaultComponent } from './components/combobox-default/combobox-default.component';
import { ComponentHostDirective } from './directives/container.directive';
import { TemplateFactoryComponent } from './components/template-factory/template-factory.component';
import { ShowHideDirective } from './directives/show-hide.directive';
import { OnlyNumberComponent } from './components/only-number/only-number.component';
import { MaskedInputDefaultComponent } from './components/masked-input-default/masked-input-default.component';
import { MaskedDefaultDirective } from './directives/masked-default.directive';
import { DatepickerDefaultComponent } from './components/datepicker-default/datepicker-default.component';
import { CalendarDefaultComponent } from './components/datepicker-default/calendar-default/calendar-default.component';

@NgModule({
  declarations: [
    ComponentHostDirective,
    FormViewerComponent,
    FormComponent,
    PageComponent,
    PanelComponent,
    QuestionComponent,
    FormViewerComponent,
    SwitchDefaultComponent,
    CheckboxDefaultComponent,
    TextfieldDefaultComponent,
    ComboboxDefaultComponent,
    TemplateFactoryComponent,
    ShowHideDirective,
    OnlyNumberComponent,
    MaskedInputDefaultComponent,
    MaskedDefaultDirective,
    DatepickerDefaultComponent,
    CalendarDefaultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [FormViewerComponent],
})
export class FormGeneratorEngineModule {
  static forRoot(
    setting: Setting
  ): ModuleWithProviders<FormGeneratorEngineModule> {

    return {
      ngModule: FormGeneratorEngineModule,
      providers: [
        FormSessionService,
        {
          provide: Setting,
          useValue: configurationSetter(setting),
        },
        {
          provide: SchemaFactoryService,
          useClass: setting.schemaFactory,
        },
      ],
    };
  }
}
