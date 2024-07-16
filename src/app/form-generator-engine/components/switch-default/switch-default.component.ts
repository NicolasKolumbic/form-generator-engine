import { Component, Input } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-switch-default',
  templateUrl: './switch-default.component.html',
  styleUrls: ['./switch-default.component.scss'],
})
export class SwitchDefaultComponent implements QuestionBaseComponent {
  @Input() question!: QuestionControl;

}
