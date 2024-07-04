import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-combobox-default',
  templateUrl: './combobox-default.component.html',
  styleUrls: ['./combobox-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDefaultComponent implements QuestionBaseComponent {
  @Input() question!: QuestionControl;

  isShow: boolean = false;
  selectedValue?: JSONObject;

  get options() {
    return this.question.options;
  }

  @HostListener('window:click', ['$event.target'])
  private onWindowClick(target: HTMLElement) {
    if (target && !target.matches('.custom-dropdown__dropdown-button')) {
      this.isShow = false;
    }
  }

  open() {
    this.isShow = true;
  }

  selectOption(item: JSONObject) {
    this.selectedValue = item;
    this.question.updateValue(item['value']);
  }

}
