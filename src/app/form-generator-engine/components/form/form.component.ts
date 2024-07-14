import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicForm } from '@form-generator-engine/composite-pattern';
import { ComponentHostDirective } from '@form-generator-engine/directives/container.directive';
import { FactoryResolverService } from '@form-generator-engine/services/factory-resolver.service';
import { DynamicComponent } from '@form-generator-engine/abstractions';
import { FactoryComponent } from '@form-generator-engine/abstractions/factory-component';
import { ShowHide } from '@form-generator-engine/helpers';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';

@Component({
  selector: 'fge-form',
  templateUrl: './form.component.html',
  providers: [FactoryResolverService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHideAnimation]
})
export class FormComponent implements FactoryComponent, OnInit {
  @Input() form!: DynamicForm;
  @ViewChild(ComponentHostDirective) container!: ComponentHostDirective;

  generatedform!: FormGroup;
  isShow: ShowHide = ShowHide.Hide;

  constructor(private readonly factoryResolverService: FactoryResolverService) {
    this.generatedform = new FormGroup({});
  }

  ngOnInit(): void {
    this.isShow = this.form.isVisible ? ShowHide.Show : ShowHide.Hide;
  }

  transform<TComponent>(element: DynamicComponent<TComponent>): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    this.factoryResolverService.name = "form";
    this.factoryResolverService.container = this.container;
    this.factoryResolverService.generateViewByList(this.form.elements, this.transform);
    
  }

  addControl(name: string, control: FormControl): void {
    this.generatedform.addControl(name, control);
  }

  private generateViewByList<TComponent>(pages: DynamicComponent<TComponent>[]): void {
    this.factoryResolverService.name = "pages";
    this.factoryResolverService.container = this.container;
    const generatedComponents = this.factoryResolverService.createComponentByList(pages);
    this.factoryResolverService.appendToViewByList(generatedComponents);
  }
}
