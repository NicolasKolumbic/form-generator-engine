import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions';
import { QuestionControl } from '@form-generator-engine/composite-pattern';
import { ShowHide } from '@form-generator-engine/helpers';
import { showHideAnimation } from '@form-generator-engine/helpers/animation-show-hide';

@Component({
  selector: 'app-combobox-default',
  templateUrl: './combobox-default.component.html',
  styleUrls: ['./combobox-default.component.scss'],
  animations: [showHideAnimation]
})
export class ComboboxDefaultComponent implements QuestionBaseComponent {
  @Input() question!: QuestionControl;

  isShowDropdownMenu: boolean = false;
  selectedValue?: JSONObject;
  isShow: ShowHide = ShowHide.Show;

  get options() {
    return this.question.options;
  }

  @HostListener('window:click', ['$event.target'])
  private onWindowClick(target: HTMLElement) {
    if (target && !target.matches('.custom-dropdown__dropdown-button')) {
      this.isShowDropdownMenu = false;
    }
  }

  ngOnInit(): void {
    this.question.visibilityChanged.subscribe((visibility: boolean) => {
      this.isShow = visibility ? ShowHide.Show : ShowHide.Hide;
    })
  }

  open() {
    this.isShowDropdownMenu = true;
  }

  selectOption(item: JSONObject) {
    this.selectedValue = item;
    this.question.updateValue(item['value']);
  }

}
