import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { FactoryComponent } from '../factory/factory.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fge-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent extends FactoryComponent implements AfterViewInit {
  @Input() form!: DynamicForm;

  generatedform!: FormGroup;

  constructor() {
    super();
    this.generatedform = new FormGroup({});
  }

  ngAfterViewInit(): void {
    this.generateViewByList(this.form.elements);
  }

  addControl(name: string, control: FormControl): void {
    this.generatedform.addControl(name, control);
  }
}
