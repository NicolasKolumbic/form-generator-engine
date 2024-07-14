import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Panel } from '@form-generator-engine/composite-pattern';
import { FactoryResolverService } from '@form-generator-engine/services/factory-resolver.service';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { ShowHide } from '@form-generator-engine/helpers';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';
import { timer } from 'rxjs';

@Component({
  selector: 'fge-panel',
  templateUrl: './panel.component.html',
  providers: [FactoryResolverService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHideAnimation]
})
export class PanelComponent implements FactoryComponent, OnInit {
  @Input() panel!: Panel;

  isShow: ShowHide = ShowHide.Hide;
  title?: string;

  @ViewChild(ComponentHostDirective) container!: ComponentHostDirective;

  constructor(private readonly factoryResolverService: FactoryResolverService) {}

  ngOnInit(): void {
    this.isShow = this.panel.isVisible ? ShowHide.Show : ShowHide.Hide;
    this.title = this.panel.title;
  }

  transform<TComponent>(element: DynamicComponent<TComponent>): void {}
  
  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.factoryResolverService.name = "panel";
    this.factoryResolverService.container = this.container;
    this.factoryResolverService.generateViewByList(this.panel.elements, this.transform);
  }

  private generateViewByList<TComponent>(panels: DynamicComponent<TComponent>[]): void {
    this.factoryResolverService.name = "panel";
    this.factoryResolverService.container = this.container;
    const generatedComponents = this.factoryResolverService.createComponentByList(panels);
    this.factoryResolverService.appendToViewByList(generatedComponents);
  }
}
