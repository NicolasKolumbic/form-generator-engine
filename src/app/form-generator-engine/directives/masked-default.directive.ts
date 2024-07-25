import { AnimationBuilder } from '@angular/animations';
import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMaskedDefault],[masked]'
})
export class MaskedDefaultDirective implements OnInit, AfterViewInit {

  @Input('masked') appMaskedDefault!: string;

  #regex!: RegExp;

  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder
  ) {
    console.log(arguments);
   }

  ngOnInit(): void {
    console.log(this.appMaskedDefault);
  }

  ngAfterViewInit(): void {
    console.log(this.appMaskedDefault);
  }

  @HostListener('keypress', ['$event.key']) 
  keypressHandler(key: string) {
    console.log(key);
    console.log(this.el.nativeElement.value);
    console.log(this.el.nativeElement.selectionStart);
    console.log(this.el.nativeElement.selectionEnd);
  }



}
