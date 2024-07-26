import { Component, Input, OnInit } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions/public';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-textfield-default',
  templateUrl: './textfield-default.component.html',
  styleUrls: ['./textfield-default.component.scss'],
})
export class TextfieldDefaultComponent implements QuestionBaseComponent, OnInit {

  @Input() question!: QuestionControl;

  ngOnInit(): void {
    this.question.error.subscribe((errorName: string) => {
      console.log(errorName);
    });
  }
}
