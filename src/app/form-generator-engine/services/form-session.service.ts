import { Inject, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { SchemaFactoryService } from './schema-factory.service';
import { UpdatedForm, FormSchema } from '../abstractions';
import { DynamicForm } from '../composite-pattern';
import { Controls } from '../helpers';
import { Setting } from './setting';

@Injectable()
export class FormSessionService {
  updateForm: Subject<UpdatedForm>;
  error: Subject<string>;
  form?: DynamicForm;

  constructor(
    private schemaFactoryService: SchemaFactoryService,
    @Inject(Setting) private readonly setting: Setting
  ) {
    this.updateForm = new Subject();
    this.error = new Subject();
  }

  getComponent(index: Controls): Type<unknown> | null {
    if (this.setting && this.setting.overwrittenControls) {
      if (
        index === Controls.Checkbox &&
        this.setting.overwrittenControls.checkbox
      ) {
        return this.setting.overwrittenControls.checkbox;
      } else if (
        index === Controls.Switch &&
        this.setting.overwrittenControls.switch
      ) {
        return this.setting.overwrittenControls.switch;
      } else if (
        index === Controls.Combobox &&
        this.setting.overwrittenControls.combobox
      ) {
        return this.setting.overwrittenControls.combobox;
      } else if (
        index === Controls.Textfield &&
        this.setting.overwrittenControls.textfield
      ) {
        return this.setting.overwrittenControls.textfield;
      } else if (
        index === Controls.Page &&
        this.setting.overwrittenControls.page
      ) {
        return this.setting.overwrittenControls.page;
      } else if (
        index === Controls.Panel &&
        this.setting.overwrittenControls.panel
      ) {
        return this.setting.overwrittenControls.panel;
      } else if (
        index === Controls.Question &&
        this.setting.overwrittenControls.question
      ) {
        return this.setting.overwrittenControls.question;
      } else if (
        index === Controls.Form &&
        this.setting.overwrittenControls.form
      ) {
        return this.setting.overwrittenControls.form;
      }
    }

    return null;
  }

  generate(data: FormSchema): DynamicForm | null {
    if (data && data.elements) {
      return new DynamicForm(data as FormSchema);
    }
    return null;
  }

  getSchema(data: JSONValue): FormSchema {
    return this.schemaFactoryService.build(data, this.form);
  }
}
