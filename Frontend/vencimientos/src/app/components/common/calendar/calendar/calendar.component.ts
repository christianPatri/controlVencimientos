import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { CalendarIcons } from '../../../../models/calendar/calendarIcons';
import { PageTitleComponent } from '../../pagestitles/page-title/page-title.component';

interface Day {
  date: number | null;
  month: number;
  year: number;
  icons: { color: string }[];
  isToday?: boolean; // Add this property
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, TooltipModule, PageTitleComponent ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  _pageTitle: string = "Calendario de Vencimientos";
  weeks: Day[][] = [];
  currentDate: Date = new Date();
  currentMonthName!: string;
  currentYear!: number;
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  constructor(
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.updateCalendar();
  }

  ngAfterViewInit() {
  }

  updateCalendar() {
    this.currentMonthName = this.currentDate.toLocaleString('es', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    this.weeks = [];
    const today = new Date();
    const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    // Ajustar el primer día de la semana al comienzo del mes actual
    const startDayOfWeek = startOfMonth.getDay();
    const endDayOfWeek = endOfMonth.getDay();

    // Rellenar con días vacíos al principio si el mes no comienza en domingo
    let currentDay = new Date(startOfMonth);
    currentDay.setDate(currentDay.getDate() - startDayOfWeek);

    while (currentDay <= endOfMonth || currentDay.getDay() !== 0) {
      const week: Day[] = [];
      for (let i = 0; i < 7; i++) {
        const isToday = currentDay.getDate() === today.getDate() &&
                        currentDay.getMonth() === today.getMonth() &&
                        currentDay.getFullYear() === today.getFullYear();

        week.push({
          date: currentDay.getMonth() === this.currentDate.getMonth() ? currentDay.getDate() : null,
          month: currentDay.getMonth(),
          year: currentDay.getFullYear(),
          icons: this.getIconsForDay(currentDay),
          isToday: isToday
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  getIconsForDay(date: Date): { color: string }[] {
    const icons: { color: string; }[] = [];

    this.calendarService.GetDayIcons(date).subscribe(
      (dayIcons: CalendarIcons) => {

        if (dayIcons.hasDayExpirations) icons.push({ color: 'red' });
        if (dayIcons.hasNextDayExpirations) icons.push({ color: 'yellow' });
        if (dayIcons.hasNext2DayExpirations) icons.push({ color: 'blue' });
        if (dayIcons.hasPreviousExpirationsNotChecked) icons.push({ color: 'black' });

        if (!dayIcons.hasDayExpirations)icons.push({ color: 'green' });

        return icons;
      },
      (err) => {
        console.log(err);
      }
    );

    return icons;
  }

  navigateToDay(day: Day) {
    if (day.date !== null) {
      let dayMonth = day.month + 1;
      this.router.navigate([`/calendar/${day.year}/${dayMonth}/${day.date}`]);
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  getTooltipText(day: Day): string {
    if (day.date !== null) {

      let text='';
      day.icons.forEach(i => {
        if (i.color == 'green') text += 'No hay vencimientos para el dia ' + day.date;
        if (i.color == 'red') text += 'Hay vencimientos para el dia ' + day.date;
        if (i.color == 'black') text += 'Hay vencimientos previos al dia ' + day.date;

      })

      return text;
    }
    return '';
  }
}
