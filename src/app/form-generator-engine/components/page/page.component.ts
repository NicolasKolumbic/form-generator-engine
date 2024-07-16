import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Page } from '@form-generator-engine/composite-pattern';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';

@Component({
  selector: 'fge-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements FactoryComponent, OnInit {
  @Input() page!: Page;

  @ViewChild(TemplateFactoryComponent, {static: true}) factory!: TemplateFactoryComponent;

  title!: string;

  ngOnInit(): void {
    this.title = this.page.title;
  }

  transform<TComponent>(element: DynamicComponent<TComponent>): void {}
  
  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.factory.generateViewByList(this.page.elements);
  }


}
