import { AnimationBuilder } from '@angular/animations';
import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BaseElement } from '@form-generator-engine/composite-pattern';
import { autoValue, CssDisplay } from '@form-generator-engine/helpers';
import { hideAnimation, showAnimation } from '@form-generator-engine/helpers/animation-show-hide';

@Directive({
  selector: '[appShowHide], [showHideAnimation]'
})
export class ShowHideDirective implements OnInit, AfterViewInit {

  @Input('showHideAnimation') appShowHide!: BaseElement

  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder
  ) {
    
   }

  ngOnInit(): void {
    this.appShowHide.visibilityChanged.subscribe((visibility: boolean): void => {
      if (visibility) {
        this.show()
      } else {
        this.hide()
      }
    });
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.display = this.appShowHide.isVisible ? CssDisplay.BLOCK : CssDisplay.NONE;
  }

  hide(): void {
    const currentHeight: number = this.el.nativeElement.clientHeight;
    const factory = this.builder.build(hideAnimation(currentHeight));
    const player = factory.create(this.el.nativeElement);
    player.onDone(() => {
      this.el.nativeElement.style.display = CssDisplay.NONE;
      player.destroy();
    });
    player.play();
    
  }

  show(): void {
    const currentHeight: number = this.el.nativeElement.clientHeight;
    const factory = this.builder.build(showAnimation(currentHeight));
    const player = factory.create(this.el.nativeElement);
    player.onStart(() => {
      this.el.nativeElement.style.display = CssDisplay.BLOCK;
    });
    player.onStart(() => {
      this.el.nativeElement.style.height = autoValue;
    })
    player.play();
    
  }

  

}
