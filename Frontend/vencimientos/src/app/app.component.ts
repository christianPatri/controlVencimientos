import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { SiteSideBarComponent } from './components/siteSideBar/site-side-bar/site-side-bar.component';
import { SessionService } from './services/session/session.service';
import { SessionComponent } from './components/session/session.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NavigationBarComponent, SessionComponent,
     FormsModule, ReactiveFormsModule, RouterModule, RouterLink, RouterLinkActive, NgIf, SiteSideBarComponent],
  //providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nicre Vencimientos';


  constructor(private sessionService: SessionService) {
  }

  logout() {
    this.sessionService.logout();
  }

  isLoggedIn() {
    return this.sessionService.isAuthenticated();
  }

  hasRole(role: string) {
    let roles = [];
    roles.push(role);

    return this.sessionService.hasRole(roles);
  }

}
