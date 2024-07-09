import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonthlyDebtor } from '../../../../models/clients/monthlyDebtor';
import { ReportService } from '../../../../services/reports/report.service';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';

@Component({
  selector: 'app-monthly-debtors-report',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './monthly-debtors-report.component.html',
  styleUrl: './monthly-debtors-report.component.css'
})
export class MonthlyDebtorsReportComponent implements OnInit{

  _monthlyDebtors!: MonthlyDebtor[];
  _isLoading: boolean = false;

  public constructor(
    private reportService: ReportService,
  ){

  }

  ngOnInit(): void {
    this._isLoading = true;
    this.getMonthlyDebtors();
  }

  getMonthlyDebtors() {
    this.reportService.getMonthlyDebtorsReport().subscribe(
      (debtors: MonthlyDebtor[]) => {
        this._monthlyDebtors = debtors;
        this._isLoading = false;
      }, (err) => {
        this._isLoading = false;
      }
    )
  }



}
