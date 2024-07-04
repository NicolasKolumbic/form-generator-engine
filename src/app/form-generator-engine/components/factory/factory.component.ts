import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { DynamicContainerDirective } from '@form-generator-engine/directives/dynamic-container.directive';

@Component({
  template: '',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactoryComponent {
  @ViewChild(DynamicContainerDirective)
  factoryContainer!: DynamicContainerDirective;

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  generateView<TComponent>(element: DynamicComponent<TComponent>): void {
    const generatedComponent = this.factoryContainer.createComponent(element);
    this.transform(element);
    this.factoryContainer.appendToView(generatedComponent);
    this.cdr.detectChanges();
  }

  generateViewByList<TComponent>(
    elements: DynamicComponent<TComponent>[]
  ): void {
    const generatedComponents =
      this.factoryContainer.createComponentByList(elements);
    elements.forEach((element: DynamicComponent<TComponent>) => {
      this.transform(element);
    });
    this.factoryContainer.appendToViewByList(generatedComponents);
    this.cdr.detectChanges();
  }

  createComponentByList<TComponent>(
    elements: DynamicComponent<TComponent>[]
  ): DynamicComponent<TComponent>[] {
    return this.factoryContainer.createComponentByList(elements);
  }

  createComponent<TComponent>(
    element: DynamicComponent<TComponent>
  ): DynamicComponent<TComponent> {
    if (this.factoryContainer) {
      return this.factoryContainer.createComponent(element);
    }
    return element;
  }
  appendToViewByList<TComponent>(
    elements: DynamicComponent<TComponent>[]
  ): void {
    if (this.factoryContainer) {
      this.factoryContainer.appendToViewByList(elements);
    }
  }
  appendToView<TComponent>(element: DynamicComponent<TComponent>): void {
    if (this.factoryContainer) {
      this.factoryContainer.appendToView(element);
    }
  }

  transform<TComponent>(_element: DynamicComponent<TComponent>): void {}
}
