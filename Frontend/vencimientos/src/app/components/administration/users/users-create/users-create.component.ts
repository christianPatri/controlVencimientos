import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../models/users/user';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  user: User = new User();
  myForm: FormGroup;

  @Output() userCreated = new EventEmitter<User>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  createUser(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.user.name = this.myForm.value.name;
      this.user.lastname = this.myForm.value.lastname;
      this.user.password = this.myForm.value.password;
      this.user.username = this.myForm.value.username;

      this.userCreated.emit(this.user);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.user.lastname =  "";
    this.user.name = "";
    this.user.password = "";
    this.user.password = "";
  }

}
