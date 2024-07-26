import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Panel } from '@form-generator-engine/composite-pattern';
import { FactoryComponent } from '@form-generator-engine/abstractions/internal';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';

@Component({
  selector: 'fge-panel',
  templateUrl: './panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements FactoryComponent, OnInit, AfterViewInit {
  @Input() panel!: Panel;

  title?: string;

  @ViewChild(TemplateFactoryComponent, {static: true}) factory!: TemplateFactoryComponent;

  ngOnInit(): void {
    this.title = this.panel.title;
  }

  ngAfterViewInit(): void {
    this.factory.generateViewByList(this.panel.elements);
  }

  
}
