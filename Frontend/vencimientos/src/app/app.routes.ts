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
import { CalendarDayComponent } from './components/common/calendar/calendar-day/calendar-day.component';
import { BulkUploadersComponent } from './components/administration/bulks/bulk-uploaders/bulk-uploaders.component';
import { SuppliersFileComponent } from './components/administration/suppliers/suppliers-file/suppliers-file.component';
import { ProductsFileComponent } from './components/administration/products/products-file/products-file.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SessionComponent },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuardService ], data: { roles: ['Admin']} },

  { path: 'administration/settings', component: SettingsComponent, canActivate: [ AuthGuardService], data: { roles: ['Admin']} },
  { path: 'administration/suppliers', component: SuppliersComponent, canActivate: [ AuthGuardService], data: { roles: ['Admin']} },
  { path: 'administration/suppliers/new', component: SuppliersGeneratorComponent, canActivate: [ AuthGuardService ], data: { roles: ['Admin']} },
  { path: 'administration/suppliers/file/:id', component: SuppliersFileComponent, canActivate: [ AuthGuardService ], data: { roles: ['Admin']} },

  { path: 'administration/products', component: ProductsComponent, canActivate: [ AuthGuardService], data: { roles: ['Admin']} },
  { path: 'administration/products/new', component: ProductsGeneratorComponent, canActivate: [ AuthGuardService ], data: { roles: ['Admin']} },
  { path: 'administration/products/file/:id', component: ProductsFileComponent, canActivate: [ AuthGuardService ], data: { roles: ['Admin']} },

  { path: 'productItems/new', component: ProductItemsGeneratorComponent, canActivate: [ AuthGuardService ], data: { roles: ['Admin', 'Operator']} },
  { path: 'calendar', component: CalendarComponent, data: { roles: ['Admin', 'Operator']} },
  { path: 'calendar/:year/:month/:day', component: CalendarDayComponent, data: { roles: ['Admin', 'Operator']} },
  { path: 'administration/fileUploads', component: BulkUploadersComponent, canActivate: [ AuthGuardService], data: { roles: ['Admin'] } },

  { path: '**', pathMatch: 'full', redirectTo: '/home'}
];
