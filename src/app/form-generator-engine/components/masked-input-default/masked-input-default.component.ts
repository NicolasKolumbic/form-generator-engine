import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions/public/question-base-component';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-masked-input-default',
  templateUrl: './masked-input-default.component.html',
  styleUrls: ['./masked-input-default.component.scss']
})
export class MaskedInputDefaultComponent implements QuestionBaseComponent, OnInit{
  @Input() question!: QuestionControl;

  @ViewChild('field', { static: true }) field!: ElementRef<HTMLInputElement>;
  
  ngOnInit(): void {
    this.question.updateValue(this.question.mask);
    this.question.control.setValue(this.question.mask);
  }

}
