import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent implements OnInit{

  @Input() componentTitle!: string;


  constructor(){

  }

  ngOnInit(): void {

  }
}
