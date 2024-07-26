import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionControl } from '@form-generator-engine/composite-pattern';
import { OnyNumberSetting } from './only-number-setting.interface';
import { InputNumberValidationBuilder } from './builder-pattern/input-number-validation-builder';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions/public';

@Component({
  selector: 'app-only-number',
  templateUrl: './only-number.component.html',
  styleUrls: ['./only-number.component.scss'],
})
export class OnlyNumberComponent implements QuestionBaseComponent, OnInit {
  @Input() question!: QuestionControl;

  @ViewChild('field', { static: true }) field!: ElementRef<HTMLInputElement>;

  setting: OnyNumberSetting = {
    decimalPoint: '.',
    onlyIntergers: false,
  };

  ngOnInit(): void {
    this.setting.onlyIntergers = !!this.question.metadata('onlyIntergers');
    this.setting.decimalPoint = !!this.question.metadata('decimalPoint')
      ? <string>this.question.metadata('decimalPoint')
      : this.setting.decimalPoint;
  }

  keydownHandler(event: KeyboardEvent): void {
    const inputNumberValidator = new InputNumberValidationBuilder(
      this.question.control.value,
      event.key,
      this.field.nativeElement.selectionStart!,
      this.field.nativeElement.selectionEnd!,
      this.setting.onlyIntergers,
      this.setting.decimalPoint
    );

    if(!inputNumberValidator.validate().isValid) {
      event.preventDefault();
    }
  }

  blurHandler(): void {
    const updatedValue = this.formatValue(this.question.control.value, true)
    this.question.control.setValue(updatedValue);
  }

  focusHandler(): void {
    const updatedValue = this.formatValue(this.question.control.value, false)
    this.question.control.setValue(updatedValue);
  }

  async pasteHandler(event: ClipboardEvent): Promise<void> {
    const copiedValue = await navigator.clipboard.readText();

        const inputNumberValidator = new InputNumberValidationBuilder(
          copiedValue,
          event.type,
          this.field.nativeElement.selectionStart!,
          this.field.nativeElement.selectionEnd!,
          this.setting.onlyIntergers,
          this.setting.decimalPoint
        ); 

        if(!inputNumberValidator.validate().isValid) {
          event.preventDefault();
        }
  }

  private formatValue(
    value: string,
    isEncodeThousandsSeparator: boolean
  ): string {
    if (value && value.toString().trim()) {
      if (isEncodeThousandsSeparator) {
        const num = this.setting.onlyIntergers
          ? parseInt(value, 10)
          : parseFloat(value);
        return new Intl.NumberFormat('EN-us').format(num);
      } else {
        return value.toString().replace(/\,/g, '');
      }
    } else {
      return '';
    }
  }

  private update(value: string, position: number): void {
    this.question.updateValue(value);
    setTimeout(() => {
      this.field.nativeElement.focus();
      this.field.nativeElement.setSelectionRange(position, position);
  },0)
  }
}
