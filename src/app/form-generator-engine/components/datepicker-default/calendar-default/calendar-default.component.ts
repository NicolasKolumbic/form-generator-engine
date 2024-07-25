import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-default',
  templateUrl: './calendar-default.component.html',
  styleUrls: ['./calendar-default.component.scss']
})
export class CalendarDefaultComponent implements OnInit {

  @Output() selectDate: EventEmitter<string> = new EventEmitter();

  readonly days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  readonly months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  oneDay: number = 60 * 60 * 24 * 1000;
  todayTimestamp: number = Date.now() - (Date.now() % this.oneDay) + new Date().getTimezoneOffset() * 1000 * 60;
  selectedDay = this.todayTimestamp;
  currentMonth!: string;

  // Variables that get updated with "state" changes
 date = new Date();
 year = this.date.getFullYear();
 month = this.date.getMonth();
 monthDetails = this.getMonthDetails(this.year, this.month);

 ngOnInit(): void {
  this.setHeader(this.year, this.month);
  this.setDateToInput(this.todayTimestamp);
}

  getNumberOfDays(year: number, month: number) : number {
    return 40 - new Date(year, month, 40).getDate();
  }

  getDayDetails (args: any)  {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    // console.log(day)
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
  
    let _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    // console.log(_date)
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    // console.log(timestamp)
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: this.days[day]
    };
  };

getMonthDetails(year: number, month : number) {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = this.getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 5;
    let currentDay = null;
    let index = 0;
    let cols = 7;
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  isCurrentDay(day: {timestamp: number}, cell: HTMLElement) {
    if (day.timestamp ===  this.todayTimestamp) {
      cell.classList.add("active");
      cell.classList.add("isCurrent");
      
    }
  };
  
  // Checks if day is one selected
  isSelectedDay(day: {timestamp: number}, cell: HTMLElement) {
    if (day.timestamp === this.selectedDay) {
      cell.classList.add("active");
      cell.classList.add("isSelected");
    }
  };

  getMonthStr(month: number) {
    return this.months[Math.max(Math.min(11, month), 0)] || "Month";
  }

  setHeaderNav(offset: number) {
    this.month = this.month + offset;
    if (this.month === -1) {
      this.month = 11;
      this.year--;
    } else if (this.month === 12) {
      this.month = 0;
      this.year++;
    }
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    return {
      year: this.year,
      month: this.month,
      monthDetails: this.monthDetails
    };
  };

  setHeader(year: number, month: number) {
    this.currentMonth = this.getMonthStr(month) + " " + year;
  };

  getDateStringFromTimestamp(timestamp: number) {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth();
    let date = dateObject.getDate();
    // return (
    //   dateObject.getFullYear() +
    //   "-" +
    //   (month < 10 ? "0" + month : month) +
    //   "-" +
    //   (date < 10 ? "0" + date : date)
    // );
    return `${this.getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
  };

  setDateToInput(timestamp: number) {
    let dateString = this.getDateStringFromTimestamp(timestamp);
    this.selectDate.emit(dateString);
  };

  previous(): void {
    const offset = -1
    const updatedCalendarHeader = this.setHeaderNav(offset);
    this.setHeader(updatedCalendarHeader.year, updatedCalendarHeader.month);
    this.monthDetails = updatedCalendarHeader.monthDetails;
    
  }

  next(): void {
    const offset = 1
    const updatedCalendarHeader = this.setHeaderNav(offset);
    this.setHeader(updatedCalendarHeader.year, updatedCalendarHeader.month);
    this.monthDetails = updatedCalendarHeader.monthDetails;
  }
    
}
