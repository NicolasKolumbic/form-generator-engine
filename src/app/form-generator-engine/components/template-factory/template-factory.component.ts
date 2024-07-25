import {  ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DynamicComponent } from '@form-generator-engine/abstractions/internal';
import { BaseElement } from '@form-generator-engine/composite-pattern';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';
import { FactoryResolverService } from '@form-generator-engine/services/factory-resolver.service';

@Component({
  selector: 'app-template-factory',
  templateUrl: './template-factory.component.html',
  providers: [FactoryResolverService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFactoryComponent {
  @ViewChild(ComponentHostDirective) container!: ComponentHostDirective;

  constructor(private readonly factoryResolverService: FactoryResolverService){}

  async generateView<TComponent>(node: DynamicComponent<TComponent> & BaseElement, transform?: (element: DynamicComponent<TComponent>) => void): Promise<void> {
    this.factoryResolverService.container = this.container;
    this.factoryResolverService.generateView(node, transform);
  }

  async generateViewByList<TComponent>(nodeList: (DynamicComponent<TComponent> & BaseElement)[], transform?: (element: DynamicComponent<TComponent>) => void): Promise<void> {
    nodeList.forEach((node: DynamicComponent<TComponent> & BaseElement) => { 
      this.factoryResolverService.container = this.container;
      this.factoryResolverService.generateView(node, transform);
    })
  }
}
