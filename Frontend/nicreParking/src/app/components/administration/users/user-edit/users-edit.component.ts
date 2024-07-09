import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../models/users/user';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
  user: User = new User();
  myForm: FormGroup;

  @Output() userEdited = new EventEmitter<User>();
  @Input() userToEdit!: User;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required], ],
      password: ['', [Validators.required]],
    });

    this.myForm.get('username')?.disable();
  }

  ngOnInit(): void {
  }

  editUser(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.user.name = this.myForm.value.name;
      this.user.lastname = this.myForm.value.lastname;
      this.user.password = this.myForm.value.password;
      this.user.username = this.user.username;

      this.userEdited.emit(this.user);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.user.lastname =  "";
    this.user.name = "";
    this.user.password = "";
    this.user.password = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties


    if (changes['userToEdit'] && !changes['userToEdit'].firstChange) {
      let user = changes['userToEdit'].currentValue;
      this.user.name = user.name;
      this.user.lastname = user.lastname;
      this.user.password = user.password;
      this.user.username = user.username;
    }

    // Perform any necessary updates based on the changes
  }
}
