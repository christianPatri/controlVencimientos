import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../../services/session/session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu: ElementRef | undefined;

  @ViewChild('dropdownUserMenu', { static: false }) dropdownUserMenu: ElementRef | undefined;

  @ViewChild('dropdownReportsMenu', { static: false }) dropdownReportsMenu: ElementRef | undefined;


  showDropdown: boolean = false;
  showDropdownAdminUser: boolean = false;
  showDropDownReports: boolean = false;
  session: SessionService;

  showPrivateSection: boolean = false;

  constructor(private sessionService: SessionService, private elementRef: ElementRef) {
    this.session = sessionService;
  }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.logout();
  }

  isLoggedIn() {
    return this.sessionService.isAuthenticated();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    // Si se abre el menú, agregamos el listener para cerrarlo cuando se haga clic en otro lugar
    if (this.showDropdown) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownOutside);
      });
    } else {
      document.removeEventListener('click', this.closeDropdownOutside);
    }
  }

  closeDropdownOutside = (event: MouseEvent) => {
    if (this.dropdownMenu && !this.dropdownMenu.nativeElement.contains(event.target as Node)) {
      this.showDropdown = false;
      document.removeEventListener('click', this.closeDropdownOutside);
    }
  }

  toggleDropdownAdminUser(): void {
    this.showDropdownAdminUser = !this.showDropdownAdminUser;
    // Si se abre el menú, agregamos el listener para cerrarlo cuando se haga clic en otro lugar
    if (this.showDropdownAdminUser) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownOutsideUser);
      });
    } else {
      document.removeEventListener('click', this.closeDropdownOutsideUser);
    }
  }

  closeDropdownOutsideUser = (event: MouseEvent) => {
    if (this.dropdownUserMenu && !this.dropdownUserMenu.nativeElement.contains(event.target as Node)) {
      this.showDropdownAdminUser = false;
      document.removeEventListener('click', this.closeDropdownOutsideUser);
    }
  }

  toggleDropdownReports(): void {
    this.showDropDownReports = !this.showDropDownReports;
    // Si se abre el menú, agregamos el listener para cerrarlo cuando se haga clic en otro lugar
    if (this.showDropDownReports) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownOutsideUser);
      });
    } else {
      document.removeEventListener('click', this.closeDropdownOutsideUser);
    }
  }

  closeDropdownOutsideReports = (event: MouseEvent) => {
    if (this.dropdownReportsMenu && !this.dropdownReportsMenu.nativeElement.contains(event.target as Node)) {
      this.showDropDownReports = false;
      document.removeEventListener('click', this.closeDropdownOutsideReports);
    }
  }



}
