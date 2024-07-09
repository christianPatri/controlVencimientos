import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/session/UserLogin';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  user = new UserLogin();
  messageError = '';
  showingAlert = false;
  showingConfirmationPanel = false;

  constructor(private router: Router, private sessionService: SessionService ) { }

  ngOnInit(): void {
  }

  login(form: NgForm ) {
    if (form.invalid ) { return; }
    this.hideAlert();
    this.hideConfirmation();

    this.sessionService.login(this.user).subscribe( (resp) => {
        this.showConfirmation("Login correcto. Te redireccionaremos a la pagina principal.")

         setTimeout(() => {
           this.router.navigateByUrl('/home');
         }, 2000);
    },
      (err) => { this.showAlert("err.error");})

  }

  showAlert( message: string ) {
    this.messageError = message;
    this.showingAlert = true;
  }

  showConfirmation( message: string ) {
    this.messageError = message;
    this.showingConfirmationPanel = true;
  }

  hideAlert(){
    this.showingAlert = false;
  }

  hideConfirmation(){
    this.showingConfirmationPanel = false;
  }

}
