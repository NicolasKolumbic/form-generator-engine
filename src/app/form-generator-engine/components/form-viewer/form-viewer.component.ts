import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { FormSessionService } from '@form-generator-engine/services/form-session.service';
import { Controls } from '@form-generator-engine/helpers';
import { FactoryComponent } from '@form-generator-engine/abstractions/internal';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';
import { UpdatedForm } from '@form-generator-engine/abstractions/public';
import { FormSchema } from '@form-generator-engine/abstractions/schemas';

@Component({
  selector: 'fge-form-viewer',
  templateUrl: './form-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormViewerComponent implements FactoryComponent, AfterViewInit, OnChanges {
  @Input() source: JSONValue | null = null;
  @Output() updateForm: EventEmitter<UpdatedForm> = new EventEmitter();

  @ViewChild(TemplateFactoryComponent, { static: true })
  factory!: TemplateFactoryComponent;

  initialized?: boolean;

  constructor(private readonly formSession: FormSessionService) {}

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
      }
    }
  }

  private clear(): void {
    this.initialized = false;
    this.formSession.form?.clear();
    this.formSession.form = undefined;
  }

  private async init(formSchema: FormSchema): Promise<void> {
    this.initialized = true;
    const dynamicGeneratedform: DynamicForm | null =
      this.formSession.generate(formSchema);

    if (dynamicGeneratedform) {
      this.formSession.form = dynamicGeneratedform;
      this.formSession.form.type = Controls.Form;
      this.formSession.form.update.subscribe((value: UpdatedForm) => {
        this.updateForm.emit(value);
      });

      await this.factory.generateView(this.formSession.form);
    }
  }
}
