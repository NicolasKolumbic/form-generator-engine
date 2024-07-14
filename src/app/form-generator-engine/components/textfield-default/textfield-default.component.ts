import { Component, Input, OnInit } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions';
import { QuestionControl } from '@form-generator-engine/composite-pattern';
import { ShowHide } from '@form-generator-engine/helpers';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';

@Component({
  selector: 'app-textfield-default',
  templateUrl: './textfield-default.component.html',
  styleUrls: ['./textfield-default.component.scss'],
  animations: [showHideAnimation]
})
export class TextfieldDefaultComponent implements QuestionBaseComponent, OnInit {

  @Input() question!: QuestionControl;

  isShow: ShowHide = ShowHide.Show;

  ngOnInit(): void {
    this.question.error.subscribe((errorName: string) => {
      console.log(errorName);
    });

    this.question.visibilityChanged.subscribe((visibility: boolean) => {
      this.isShow = visibility ? ShowHide.Show : ShowHide.Hide;
    });
  }
}
