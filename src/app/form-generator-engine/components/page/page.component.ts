import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Page } from '@form-generator-engine/composite-pattern';
import { FactoryComponent } from '../factory/factory.component';

@Component({
  selector: 'fge-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends FactoryComponent implements AfterViewInit {
  @Input() page!: Page;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.generateViewByList(this.page.elements);
  }
}
