import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
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
import { FactoryComponent } from '../factory/factory.component';

@Component({
  selector: 'fge-question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHideAnimation],
})
export class QuestionComponent
  extends FactoryComponent
  implements AfterViewInit
{
  @Input() question!: Question;

  isShow: 'hide' | 'show' = 'hide';

  constructor(
    private readonly formSession: FormSessionService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.generateViewByList(this.question.elements);
    this.isShow = 'show';
    this.cdr.detectChanges();
  }

  override transform<TComponent>(element: DynamicComponent<TComponent>): void {
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
}
