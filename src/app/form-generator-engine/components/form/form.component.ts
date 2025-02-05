import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { FactoryComponent } from '@form-generator-engine/abstractions/internal';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';

@Component({
  selector: 'fge-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements FactoryComponent, AfterViewInit {
  @Input() form!: DynamicForm;
  @ViewChild(TemplateFactoryComponent, {static: true}) factory!: TemplateFactoryComponent;

  generatedform!: FormGroup;

  constructor() {
    this.generatedform = new FormGroup({});
  }

  ngAfterViewInit(): void {
    this.factory.generateViewByList(this.form.elements);
  }

  addControl(name: string, control: FormControl): void {
    this.generatedform.addControl(name, control);
  }

}
