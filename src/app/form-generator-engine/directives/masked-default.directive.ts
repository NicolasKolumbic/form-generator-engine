import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MaskValidationBuilder } from '@form-generator-engine/components/masked-input-default/builder-pattern/masked-validation-builder';

@Directive({
  selector: '[appMaskedDefault],[masked]',
  providers: [
    MaskValidationBuilder
  ]
})
export class MaskedDefaultDirective implements OnInit, AfterViewInit {

  @Input('masked') appMaskedDefault!: string;

  #inputField!: HTMLInputElement;
  #allowKeys : RegExp = /Tab|ArrowLeft|ArrowRight/;

  constructor(
    private el: ElementRef,
    private maskValidation: MaskValidationBuilder
  ) {}

  ngOnInit(): void {
    this.maskValidation.init(this.appMaskedDefault);
  }

  ngAfterViewInit(): void {
    this.#inputField = this.el.nativeElement;
  }

  @HostListener('keydown', ['$event']) 
  keyDownHandler(event: KeyboardEvent) {
    if(/[0-9]/.test(event.key)) {
      event.preventDefault();
      this.#resolve(event.key)
    } else if(!this.#allowKeys.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('keypress', ['$event']) 
  keypressHandler(event: KeyboardEvent) {
    if(!this.#allowKeys.test(event.key)) {
      event.preventDefault();
    }
  }

  #resolve(key: string): void {
    const startCursor = this.#inputField.selectionStart!;
    const endCursor = this.#inputField.selectionEnd!;
    const isInvalidCharacter = this.maskValidation.validate(
      key, 
      startCursor,
      endCursor
    );

    if(isInvalidCharacter) {
      const characters: string[] = this.#inputField.value.split('');
      this.#inputField.value = characters.map((char: string, index: number) => {
        if(index === startCursor) {
          return key;
        }
        return char;
      }).join('');
      this.#inputField.setSelectionRange(startCursor + 1, startCursor + 1)
    } else {
      const characters: string[] = this.#inputField.value.split('');
      this.#inputField.value = characters.map((char: string, index: number) => {
        if(index === (startCursor + 1)) {
          return key;
        }
        return char;
      }).join('');
      this.#inputField.setSelectionRange(startCursor + 2, startCursor + 2)
    }
  }


}
