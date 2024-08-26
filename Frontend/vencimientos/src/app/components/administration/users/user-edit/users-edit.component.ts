import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../models/users/user';
import { UserRoles } from '../../../../models/users/userRoles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
  user: User = new User();
  myForm: FormGroup;

  userRoles = Object.keys(UserRoles)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      id: UserRoles[key as keyof typeof UserRoles],
      name: key
    }));

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
      role: [null, Validators.required] // Usando FormControl para el select
    });

    this.myForm.get('username')?.disable();
  }

  ngOnInit(): void {
    if (this.userToEdit) {
      this.updateForm(this.userToEdit);
    }

  }

  private updateForm(user: User) {
    this.myForm.patchValue({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      role: user.role
    });
  }

  editUser() {
    if (this.myForm.invalid) {
      return;
    }

    if (this.myForm.valid) {
      // Update the user object with form values
      const updatedUser = this.myForm.value as User;
      updatedUser.username = this.userToEdit.username; // Keep the original username
      this.userEdited.emit(updatedUser);
    }
  }

  clearFormFields() {
    this.myForm.reset();
    this.myForm.patchValue({
      username: {value: '', disabled: true} // Reset username field
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userToEdit'] && !changes['userToEdit'].firstChange) {
      const user = changes['userToEdit'].currentValue;
      this.updateForm(user);
    }
  }
}
