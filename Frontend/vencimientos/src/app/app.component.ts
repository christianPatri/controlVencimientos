import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { SiteSideBarComponent } from './components/siteSideBar/site-side-bar/site-side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NavigationBarComponent, FormsModule, ReactiveFormsModule, RouterModule, RouterLink, RouterLinkActive, NgIf, SiteSideBarComponent],
  //providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nicreParking';
}
