import { PageComponent } from '../components/page/page.component';
import { Panel } from './panel';
import { DynamicForm } from './dynamic-form';
import { Controls } from '../helpers';
import { FormEngineComponent } from '../typing/form-engine-component';
import {
  DynamicComponent,
  PageSchema,
  PanelSchema,
} from '../abstractions';
import { ElementManager } from './element-manager';

export class Page
  extends ElementManager<Panel, DynamicForm, PageSchema>
  implements DynamicComponent<PageComponent>
{

  component!: FormEngineComponent<PageComponent>;
  type: Controls;

  constructor(
    schema: PageSchema,
    parent: DynamicForm
  ) {
    super(schema, parent);
    this.type = Controls.Page;
  }

  addSchemaElement(panel: PanelSchema): void {
    const newPanel = new Panel(panel, this);
    this.elements.push(newPanel);
  }

  checkAndUpdate(): void {
    this.elements.forEach((panel: Panel) => {
      if (!panel.hasInjected()) {
        /*this.component.instance.createComponent(panel);
        this.component.instance.appendToView(panel);
        this.component.changeDetectorRef.markForCheck();*/
      }
      panel.checkAndUpdate();
    });
  }
}
