import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../../models/users/user';
import { UsersEditComponent } from '../user-edit/users-edit.component';
import { UsersCreateComponent } from '../users-create/users-create.component';

@Component({
  selector: 'app-users-modal',
  standalone: true,
  imports: [CommonModule, UsersCreateComponent, UsersEditComponent],
  templateUrl: './users-modal.component.html',
  styleUrl: './users-modal.component.css'
})
export class UsersModalComponent implements OnInit{

  isOpen = false;
  userData!: User;

  @ViewChild('usersCreate') usersCreateComponent!: UsersCreateComponent;
  @ViewChild('usersEdite') userEditComponent!: UsersEditComponent;

  @Output() userCreatedModal = new EventEmitter<User>();
  @Output() userEditedModal = new EventEmitter<User>();

  @Input() isEditing!: boolean;
  @Input() userToEdit!: User;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.usersCreateComponent) this.usersCreateComponent.clearFormFields();

    if(this.userEditComponent) this.userEditComponent.clearFormFields();

  }

  showRegisterUserMessage() {

  }

  handleUserCreated(userData: User) {
    this.userData = userData;
    this.userCreatedModal.emit(this.userData);
  }

  handleUserEdited(userData: User) {
    this.userData = userData;
    this.userEditedModal.emit(this.userData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['userToEdit']) {
      let user = changes['userToEdit'].currentValue;
    }

    if (changes['age']) {
      console.log('Age changed to:');
    }

    // Perform any necessary updates based on the changes
  }

}
