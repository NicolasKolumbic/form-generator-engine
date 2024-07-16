import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';

@Component({
  selector: 'fge-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements FactoryComponent {
  @Input() form!: DynamicForm;
  @ViewChild(TemplateFactoryComponent, {static: true}) factory!: TemplateFactoryComponent;

  generatedform!: FormGroup;

  constructor() {
    this.generatedform = new FormGroup({});
  }

  transform<TComponent>(element: DynamicComponent<TComponent>): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    this.factory.generateViewByList(this.form.elements);
  }

  addControl(name: string, control: FormControl): void {
    this.generatedform.addControl(name, control);
  }

}
