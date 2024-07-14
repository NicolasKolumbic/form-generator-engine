import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Page } from '@form-generator-engine/composite-pattern';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';
import { FactoryResolverService } from '@form-generator-engine/services/factory-resolver.service';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { ShowHide } from '@form-generator-engine/helpers';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';

@Component({
  selector: 'fge-page',
  templateUrl: './page.component.html',
  providers: [FactoryResolverService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHideAnimation]
})
export class PageComponent implements FactoryComponent, OnInit {
  @Input() page!: Page;

  isShow: ShowHide = ShowHide.Hide;
  title!: string;

  @ViewChild(ComponentHostDirective) container!: ComponentHostDirective;

  constructor(private readonly factoryResolverService: FactoryResolverService) {}

  ngOnInit(): void {
    this.title = this.page.title;
    this.isShow = this.page.isVisible ? ShowHide.Show : ShowHide.Hide;
  }

  transform<TComponent>(element: DynamicComponent<TComponent>): void {}
  
  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.factoryResolverService.name = "page";
    this.factoryResolverService.container = this.container;
    this.factoryResolverService.generateViewByList(this.page.elements, this.transform);
  }

  private generateViewByList<TComponent>(panels: DynamicComponent<TComponent>[]): void {
    this.factoryResolverService.name = "page";
    this.factoryResolverService.container = this.container;
    const generatedComponents = this.factoryResolverService.createComponentByList(panels);
    this.factoryResolverService.appendToViewByList(generatedComponents);
  }
}
