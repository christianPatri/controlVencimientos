import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageTitleComponent } from '../common/pagestitles/page-title/page-title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _pageTitle: string = "Sistema de gestion de vencimientos";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigateToCalendar(){
    this.router.navigate( ['calendar']);
  }

  public navigateInProducts(){
    this.router.navigate( ['productItems/new']);
  }
}
