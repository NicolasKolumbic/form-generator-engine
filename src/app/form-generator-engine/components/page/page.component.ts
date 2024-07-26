import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Page } from '@form-generator-engine/composite-pattern';
import { FactoryComponent } from '@form-generator-engine/abstractions/internal';
import { TemplateFactoryComponent } from '../template-factory/template-factory.component';

@Component({
  selector: 'fge-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements FactoryComponent, OnInit, AfterViewInit {
  @Input() page!: Page;

  @ViewChild(TemplateFactoryComponent, {static: true}) factory!: TemplateFactoryComponent;

  title!: string;

  ngOnInit(): void {
    this.title = this.page.title;
  }

  ngAfterViewInit(): void {
    this.factory.generateViewByList(this.page.elements);
  }


}
