import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  ModuleWithProviders,
  OnChanges,
  Output,
  Provider,
  SimpleChanges,
} from '@angular/core';
import {
  FormSchema,
  UpdatedForm,
} from '@form-generator-engine/abstractions';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { FormSessionService } from '@form-generator-engine/services/form-session.service';
import { Controls } from '@form-generator-engine/helpers';
import { FactoryComponent } from '../factory/factory.component';


@Component({
  selector: 'fge-form-viewer',

  templateUrl: './form-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormViewerComponent extends FactoryComponent implements AfterViewInit, OnChanges {
  @Input() source: JSONValue | null = null;
  @Output() updateForm: EventEmitter<UpdatedForm> = new EventEmitter();

  title?: string;
  initialized?: boolean;

  constructor(private readonly formSession: FormSessionService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source'] && !changes['source'].firstChange) {
      const data = changes['source'].currentValue;
      if (data) {
        this.process(data);
      } else {
        this.clear();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.source) {
      this.process(this.source);
    } else {
      this.clear();
    }
  }

  private process(data: JSONValue): void {
    const formSchema = this.formSession.getSchema(data);

    if (formSchema) {
      if (!this.initialized) {
        this.init(formSchema);
      } else {
        this.update(formSchema);
      }
    }
  }

  private clear(): void {
    this.initialized = false;
    this.formSession.form?.clear();
    this.formSession.form = undefined;
  }

  private init(formSchema: FormSchema): void {
    this.initialized = true;
    const dynamicGeneratedform: DynamicForm | null =
      this.formSession.generate(formSchema);

    if (dynamicGeneratedform) {
      this.formSession.form = dynamicGeneratedform;
      this.formSession.form.type = Controls.Form;
      this.formSession.form.update.subscribe((value: UpdatedForm) => {
        this.updateForm.emit(value);
      });

      this.generateView(this.formSession.form);
    }
  }

  private update(data: FormSchema): void {
    if (
      this.formSession.form &&
      this.formSession.form.elements.length !== data.elements.length
    ) {
      this.formSession.form.checkAndUpdate();
    }
  }
}
