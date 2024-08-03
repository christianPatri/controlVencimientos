import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Day {
  date: number | null;
  month: number;
  year: number;
  icons: { color: string }[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, Tooltip],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  weeks: Day[][] = [];
  currentDate: Date = new Date();
  currentMonthName!: string;
  currentYear!: number;
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateCalendar();
  }

  ngAfterViewInit() {
    this.initializeTooltips();
  }

  updateCalendar() {
    this.currentMonthName = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    this.weeks = [];
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
        week.push({
          date: currentDay.getMonth() === this.currentDate.getMonth() ? currentDay.getDate() : null,
          month: currentDay.getMonth(),
          year: currentDay.getFullYear(),
          icons: this.getIconsForDay(currentDay)
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  getIconsForDay(date: Date): { color: string }[] {
    const icons = [];
    if (date.getDate() % 3 === 0) icons.push({ color: 'red' });
    if (date.getDate() % 5 === 0) icons.push({ color: 'yellow' });
    if (date.getDate() % 7 === 0) icons.push({ color: 'green' });
    return icons;
  }

  navigateToDay(day: Day) {
    if (day.date !== null) {
      const selectedDate = new Date(day.year, day.month, day.date);
      this.router.navigate(['/day', selectedDate.toISOString()]);
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
      return `Información adicional para el día ${day.date}`;
    }
    return '';
  }

  initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }
}
