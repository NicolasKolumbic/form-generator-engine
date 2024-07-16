import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-checkbox-default',
  templateUrl: './checkbox-default.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDefaultComponent implements QuestionBaseComponent {
  @Input() question!: QuestionControl;

}
