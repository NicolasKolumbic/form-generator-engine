import { createComponent, EnvironmentInjector, Injectable, NgZone } from '@angular/core';
import { DynamicComponent, HtmlFormControl } from '@form-generator-engine/abstractions';
import { Controls } from '@form-generator-engine/helpers';
import { FormEngineComponent } from '@form-generator-engine/typing/form-engine-component';
import { FormSessionService } from './form-session.service';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';

enum InputNames {
  Page = 'page',
  Panel = 'panel',
  Question = 'question',
  Form = 'form',
}

@Injectable()
export class FactoryResolverService {

  container!: ComponentHostDirective;

  constructor(
    private formSession: FormSessionService,
    private injector: EnvironmentInjector,
  ) {}

  async generateView<TComponent>(element: DynamicComponent<TComponent>, transform?: (element:  DynamicComponent<TComponent>)=> void): Promise<void> {
    const generatedComponent: DynamicComponent<TComponent> = this.createComponent(element);
    if (transform) {
      transform(element);
    }
    await this.appendToView(generatedComponent);
  }

  async generateViewByList<TComponent>(
    elements: DynamicComponent<TComponent>[],
    transform?: (element:  DynamicComponent<TComponent>)=> void
  ): Promise<void> {
    const generatedComponents =
      this.createComponentByList(elements);
    elements.forEach((element: DynamicComponent<TComponent>) => {
      if (transform) {
        transform(element);
      }
    });
    await this.appendToViewByList(generatedComponents);
  }

  createComponentByList<TComponent>(
    values: DynamicComponent<TComponent>[]
  ): DynamicComponent<TComponent>[] {
    return values.map((node: DynamicComponent<TComponent>) => {
      return this.createComponent(node);
    }) as DynamicComponent<TComponent>[];
  }

  createComponent<TComponent>(
    node: DynamicComponent<TComponent>
  ): DynamicComponent<TComponent> {
    if (!node.component) {
      const component = this.formSession.getComponent(node.type);
      if (component) {
          const componentRef = createComponent(component, {
            environmentInjector: this.injector,
          }) as FormEngineComponent<TComponent>;

          componentRef.setInput(this.getInputNameComponent(node), node);
          node.component = componentRef;
      }
    }

    return node as DynamicComponent<TComponent>;
  }

  async appendToViewByList<TComponent>(
    elements: DynamicComponent<TComponent>[]
  ): Promise<void> {
    if (this.container) {
      elements.forEach(async (element: DynamicComponent<TComponent>) => {
        await this.appendToView(element)
      });
    }
  }

  async appendToView<TComponent>(node: DynamicComponent<TComponent>): Promise<void> {
    if (!(node as unknown as HtmlFormControl).hasInjected()) {
        await this.container.viewContainerRef.insert(node.component.hostView);
        (node as unknown as HtmlFormControl).injected();
        node.component.changeDetectorRef.markForCheck();
    }
  }

  private getInputNameComponent<T>(node: T): InputNames {
    if ((node as any).type === Controls.Page) {
      return InputNames.Page;
    } else if ((node as any).type === Controls.Panel) {
      return InputNames.Panel;
    } else if ((node as any).type === Controls.Form) {
      return InputNames.Form;
    }
    return InputNames.Question;
  }
}
