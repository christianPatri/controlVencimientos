import { Routes } from '@angular/router';
import { UsersComponent } from './components/administration/users/users/users.component';
// import { ClientsComponent } from './components/clients/clients.component';
import { HourlyClientsComponent } from './components/clients/hourlyClients/hourly-clients/hourlyClients.component';
import { MonthlyClientsComponent } from './components/clients/monthlyClients/monthly-clients/monthlyClients.component';
import { NightlyClientsComponent } from './components/clients/nightlyClients/nightly-clients/nightly-clients.component';
import { HomeComponent } from './components/home/home.component';
import { SessionComponent } from './components/session/session.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdmininstrationMonthlyClientsComponent } from './components/administration/monthlyClients/monthly-clients/administration-monthly-clients.component';
import { MonthlyClientsGeneratorComponent } from './components/administration/monthlyClients/monthly-clients-generator/monthly-clients-generator.component';
import { MonthlyClientsFileComponent } from './components/administration/monthlyClients/monthly-client-file/monthly-clients-file.component';
import { MonthlyDebtorsReportComponent } from './components/administration/reports/monthly-debtors-report/monthly-debtors-report.component';
import { NightlyParkingReportComponent } from './components/administration/reports/nightly-parking-report/nightly-parking-report.component';
import { HourlylyParkingReportComponent } from './components/administration/reports/hourlyly-parking-report/hourlyly-parking-report.component';
import { SettingsComponent } from './components/administration/settings/settings/settings.component';
import { MonthlyParkingReportComponent } from './components/administration/reports/monthly-parking-report/monthly-parking-report.component';
import { MonthlyVehicleMovementsComponent } from './components/administration/monthlyVehicles/monthly-vehicle-movements/monthly-vehicle-movements.component';
import { SuppliersComponent } from './components/administration/suppliers/suppliers/suppliers.component';
import { ProductsComponent } from './components/administration/products/products/products.component';
import { SuppliersGeneratorComponent } from './components/administration/suppliers/suppliers-generator/suppliers-generator.component';
import { ProductsGeneratorComponent } from './components/administration/products/products-generator/products-generator.component';
import { ProductItemsGeneratorComponent } from './components/common/productItems/product-items-generator/product-items-generator.component';
import { CalendarComponent } from './components/common/calendar/calendar/calendar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'monthlyClients', component: MonthlyClientsComponent },
  { path: 'hourlyClients', component: HourlyClientsComponent },
  { path: 'nightlyClients', component: NightlyClientsComponent },
  { path: 'login', component: SessionComponent },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuardService ] },
  { path: 'administration/monthlyClients', component: AdmininstrationMonthlyClientsComponent, canActivate: [ AuthGuardService ] },
  { path: 'administration/monthlyClients/new', component: MonthlyClientsGeneratorComponent, canActivate: [ AuthGuardService ] },
  { path: 'administration/monthlyClients/file/:id', component: MonthlyClientsFileComponent, canActivate: [ AuthGuardService ] },
  { path: 'administration/monthlyClients/file/:id/vehicleMovements', component: MonthlyVehicleMovementsComponent, canActivate: [ AuthGuardService ] },
  { path: 'administration/monthlyDebtorsReport', component: MonthlyDebtorsReportComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/nightlyReport', component: NightlyParkingReportComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/hourlyReport', component: HourlylyParkingReportComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/monthlyReport', component: MonthlyParkingReportComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/settings', component: SettingsComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/suppliers', component: SuppliersComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/suppliers/new', component: SuppliersGeneratorComponent, canActivate: [ AuthGuardService ] },
  { path: 'administration/products', component: ProductsComponent, canActivate: [ AuthGuardService] },
  { path: 'administration/products/new', component: ProductsGeneratorComponent, canActivate: [ AuthGuardService ] },
  { path: 'productItems/new', component: ProductItemsGeneratorComponent, canActivate: [ AuthGuardService ] },
  { path: 'calendar', component: CalendarComponent },

  { path: '**', pathMatch: 'full', redirectTo: '/home'}
];
