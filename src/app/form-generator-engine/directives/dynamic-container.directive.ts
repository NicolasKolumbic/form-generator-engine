import {
  Directive,
  EnvironmentInjector,
  ViewContainerRef,
  createComponent,
} from '@angular/core';
import { Controls } from '../helpers';
import { FormSessionService } from '../services/form-session.service';
import { FormEngineComponent } from '../typing/form-engine-component';
import { DynamicComponent, HtmlFormControl } from '../abstractions';

enum InputNames {
  Page = 'page',
  Panel = 'panel',
  Question = 'question',
  Form = 'form',
}

@Directive({
  selector: '[fgeDynamicContainer]',
})
export class DynamicContainerDirective {
  constructor(
    private viewContainer: ViewContainerRef,
    private formSession: FormSessionService,
    private injector: EnvironmentInjector
  ) {}

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

  appendToViewByList<TComponent>(nodes: DynamicComponent<TComponent>[]): void {
    nodes.forEach((node: DynamicComponent<TComponent>) => {
      this.appendToView(node);
    });
  }

  appendToView<TComponent>(node: DynamicComponent<TComponent>): void {
    if (!(node as unknown as HtmlFormControl).hasInjected()) {
      this.viewContainer.insert(node.component.hostView);
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
