import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  DynamicComponent,
  FormSchema,
  UpdatedForm,
} from '@form-generator-engine/abstractions';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { FormSessionService } from '@form-generator-engine/services/form-session.service';
import { Controls, ShowHide } from '@form-generator-engine/helpers';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';
import { FactoryResolverService } from '@form-generator-engine/services/factory-resolver.service';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';

@Component({
  selector: 'fge-form-viewer',
  templateUrl: './form-viewer.component.html',
  providers: [FactoryResolverService],
  animations: [showHideAnimation],
})
export class FormViewerComponent implements FactoryComponent {
  @Input() source: JSONValue | null = null;
  @Output() updateForm: EventEmitter<UpdatedForm> = new EventEmitter();

  @ViewChild(ComponentHostDirective) container!: ComponentHostDirective;

  title?: string;
  initialized?: boolean;
  isShow: ShowHide = ShowHide.Show;

  constructor(
    private readonly formSession: FormSessionService,
    private readonly factoryResolverService: FactoryResolverService
  ) {}
  
  transform<TComponent>(_element: DynamicComponent<TComponent>): void {}

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

      this.formSession.form.visibilityChanged.subscribe((visibility: boolean) => {
        this.isShow = visibility ? ShowHide.Show : ShowHide.Hide;
      });

      this.factoryResolverService.name = "form-viewer";
      this.factoryResolverService.container = this.container;
      this.factoryResolverService.generateView(this.formSession.form, this.transform);
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

  hideFromView(arg: any) {
    console.log(arguments);
  }
}
