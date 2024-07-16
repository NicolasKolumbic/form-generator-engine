import { EnvironmentInjector, inject, ModuleWithProviders, NgModule, Provider } from '@angular/core';
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
    ShowHideDirective
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
    const providers: Provider[] = [];

    if (setting.schemaFactory) {
      providers.push({
        provide: SchemaFactoryService,
        useClass: setting.schemaFactory,
      });
    }

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
