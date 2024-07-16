import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Panel } from '@form-generator-engine/composite-pattern';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';

@Component({
  selector: 'fge-panel',
  templateUrl: './panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements FactoryComponent, OnInit {
  @Input() panel!: Panel;

  title?: string;

  @ViewChild(TemplateFactoryComponent, {static: true}) factory!: TemplateFactoryComponent;

  ngOnInit(): void {
    this.title = this.panel.title;
  }

  transform<TComponent>(element: DynamicComponent<TComponent>): void {}
  
  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.factory.generateViewByList(this.panel.elements);
  }

  
}
