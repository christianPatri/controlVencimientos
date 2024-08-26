import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../models/users/user';
import { UserRoles } from '../../../../models/users/userRoles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  user: User = new User();
  myForm: FormGroup;
  userRoles = Object.keys(UserRoles)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      id: UserRoles[key as keyof typeof UserRoles],
      name: key
    }));

  @Output() userCreated = new EventEmitter<User>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: [null, Validators.required] // Usando FormControl para el select
    });
  }

  ngOnInit(): void {
    // this.userRoles = Object.keys(UserRoles)
    // .filter(key => isNaN(Number(key))) // Filtrar solo las claves que son nombres de roles
    // .map(key => ({
    //   id: UserRoles[key as keyof typeof UserRoles], // Obtener el valor numérico del enum
    //   name: key                                      // Obtener el nombre del rol
    // }));
  }

  createUser(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.user.name = this.myForm.value.name;
      this.user.lastname = this.myForm.value.lastname;
      this.user.password = this.myForm.value.password;
      this.user.username = this.myForm.value.username;
      this.user.role = this.myForm.value.role;

      this.userCreated.emit(this.user);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.user.lastname =  "";
    this.user.name = "";
    this.user.password = "";
    this.user.password = "";
    this.user.role = 0;
  }

}
