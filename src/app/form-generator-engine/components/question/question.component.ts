import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import {
  DynamicComponent,
  UpdateField,
} from '@form-generator-engine/abstractions';
import {
  Question,
  QuestionControl,
} from '@form-generator-engine/composite-pattern';
import { FormSessionService } from '@form-generator-engine/services/form-session.service';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';
import { FactoryResolverService } from '@form-generator-engine/services/factory-resolver.service';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { ShowHide } from '@form-generator-engine/helpers';
import { timer } from 'rxjs';

@Component({
  selector: 'fge-question',
  templateUrl: './question.component.html',
  providers: [FactoryResolverService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHideAnimation],
})
export class QuestionComponent
  implements FactoryComponent, OnInit
{
  @Input() question!: Question;

  @ViewChild(ComponentHostDirective) container!: ComponentHostDirective;

  isShow: ShowHide = ShowHide.Hide;

  constructor(
    private readonly factoryResolverService: FactoryResolverService,
    private readonly formSession: FormSessionService) {}

  ngOnInit(): void {
    this.isShow = this.question.isVisible ? ShowHide.Show : ShowHide.Hide;
  }

  ngAfterViewInit(): void {
    this.factoryResolverService.name = "question";
    this.factoryResolverService.container = this.container;
    this.factoryResolverService.generateViewByList(this.question.elements, this.transform.bind(this));
  }
  
  ngOnChanges(changes: SimpleChanges): void {}

  transform<TComponent>(element: DynamicComponent<TComponent>): void {
    const questionControl = element as unknown as QuestionControl;
    if (!questionControl.control) {
      const validations: ValidatorFn[] = this.getValidations(questionControl);
      const definition =  {
        value: questionControl.getValue<string>() ?? '',
        disabled: questionControl.disabled
      };
      const formControl = new FormControl(definition, validations);

      questionControl.update.subscribe((updatedValue: UpdateField) => {
        this.formSession.form!.updateValue(updatedValue, questionControl);
      });

      this.question.visibilityChanged.subscribe((visibility: boolean) => {
        this.isShow = visibility ? ShowHide.Show : ShowHide.Hide;
      })

      
      formControl.valueChanges.subscribe((value: string | null) => {
        questionControl.updateValue(value);

        if (questionControl.control.errors !== null) {
          const errorKey = Object.keys(questionControl.control.errors);
          questionControl.error.next(errorKey[0]);
        }
      });
      this.formSession.form?.addControl(questionControl.name, formControl);
      questionControl.setControl(formControl);
    }
  }

  private getValidations(questionControl: QuestionControl): ValidatorFn[] {
    const validations: ValidatorFn[] = [];
    if (questionControl.isRequired) {
      validations.push(Validators.required);
    }
    if (questionControl.minlength > 0) {
      validations.push(Validators.minLength(questionControl.minlength));
    }
    if (questionControl.maxlength) {
      validations.push(Validators.maxLength(questionControl.maxlength));
    }
    if (questionControl.pattern) {
      validations.push(Validators.pattern(questionControl.pattern));
    }

    return validations;
  }

  private generateViewByList<TComponent>(questions: DynamicComponent<TComponent>[]): void {
    this.factoryResolverService.name = "question";
    this.factoryResolverService.container = this.container;
    const generatedComponents = this.factoryResolverService.createComponentByList(questions);
    generatedComponents.forEach((component: DynamicComponent<TComponent>) => {
      this.transform(component);
    })
    this.factoryResolverService.appendToViewByList(generatedComponents);
  }
}
