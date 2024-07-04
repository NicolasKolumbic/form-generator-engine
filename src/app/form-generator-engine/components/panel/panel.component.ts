import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Panel } from '@form-generator-engine/composite-pattern';
import { FactoryComponent } from '../factory/factory.component';

@Component({
  selector: 'fge-panel',
  templateUrl: './panel.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent extends FactoryComponent implements AfterViewInit {
  @Input() panel!: Panel;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.generateViewByList(this.panel.elements);
  }
}
