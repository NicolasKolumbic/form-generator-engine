import { Component, Input, OnInit } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions/public/question-base-component';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-masked-input-default',
  templateUrl: './masked-input-default.component.html',
  styleUrls: ['./masked-input-default.component.scss']
})
export class MaskedInputDefaultComponent implements QuestionBaseComponent, OnInit{
  @Input() question!: QuestionControl;
  
  ngOnInit(): void {
    this.question.updateValue("00-0000000-0");
    this.question.control.setValue("00-0000000-0")
  }

}
