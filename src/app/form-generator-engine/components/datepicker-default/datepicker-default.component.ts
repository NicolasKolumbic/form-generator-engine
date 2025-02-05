import { Component, HostListener, Input, OnInit } from '@angular/core';
import { QuestionBaseComponent } from '@form-generator-engine/abstractions/public';
import { QuestionControl } from '@form-generator-engine/composite-pattern';

@Component({
  selector: 'app-datepicker-default',
  templateUrl: './datepicker-default.component.html',
  styleUrls: ['./datepicker-default.component.scss']
})
export class DatepickerDefaultComponent implements QuestionBaseComponent, OnInit {
  @Input() question!: QuestionControl;

  isShow: boolean = false;

  ngOnInit(): void {
    
  }

  showCalendar() {
    this.isShow = !this.isShow;
  }

  @HostListener('window:click', ['$event.target'])
  private onWindowClick(target: HTMLElement) {
    if (target && !target.matches('.date_picker_control')) {
      this.isShow = false;
    }
  }

}


