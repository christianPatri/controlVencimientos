import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from '../../../../models/users/user';
import { UsersModalComponent } from '../users-modal/users-modal.component';
import { UserRoles } from '../../../../models/users/userRoles';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';

@Component({
  selector: 'app-users-grid',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule, UsersModalComponent, GenericModalComponent ],
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.css']
})
export class UsersGridComponent implements OnInit {

  nombreFilter: string = '';
  apellidoFilter: string = '';
  usernameFilter: string = '';
  filteredUsers: any[] = [];

  //isEditingUser: boolean = false;
  userToEdit!: User;
  userToDelete!: User;

  @Input() users!: User[];
  @Input() successMessage: string = "";
  @Input() errorUpdate: Subject<string> = new Subject<string>();
  @Output() userDeleteEvent = new EventEmitter<User>();
  @Output() userEditEvent = new EventEmitter<User>();
  @Output() userCreateEvent = new EventEmitter<User>();

  @ViewChild('usersEditModal') usersModal!: UsersModalComponent;
  @ViewChild('usersCreateModal') usersCreateModal!: UsersModalComponent;


  @ViewChild('submitModal') submitModal!: GenericModalComponent;
  _submitModalTitle: string = "Eliminar Usuario";


  messageError: string = "";
  showingUserAlert: boolean = false;
  showingUserPanel: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.errorUpdate.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges();
    });

    this.filteredUsers = this.users;
  }

  editUser(index: number) {
    this.userToEdit = this.users[index];
    this.usersModal.openModal();
  }

  openDeleteUserModal(index: any) {
    this.userToDelete = this.users[index];
    this.submitModal.openModal();
  }

  handleDeleteUserModalEvent(mustDelete: boolean) {
    if(mustDelete){
      this.hideConfirmation();
      this.hideAlert();
      this.userDeleteEvent.emit(this.userToDelete);
    } else {
      this.submitModal.closeModal();
    }

  }

  handleEditUser(editedUser: User) {
    this.hideConfirmation();
    this.hideAlert();
    this.userEditEvent.emit(editedUser);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.nombreFilter.toLowerCase()) &&
      user.lastname.toLowerCase().includes(this.apellidoFilter.toLowerCase()) &&
      user.username.toLowerCase().includes(this.usernameFilter.toLowerCase())
    );
  }

  getUserRoleByRoleId(roleId: number){
    return UserRoles[roleId as unknown as keyof typeof UserRoles] || 'Unknown Role';
  }

  openUsersModal() {
    this.hideConfirmation();
    this.hideAlert();
    this.usersCreateModal.openModal();
  }

  handleCreateUser(newUser: User) {
    this.hideConfirmation();
    this.hideAlert();
    this.userCreateEvent.emit(newUser);
  }

  showAlert( message: string ) {
    this.messageError = message;
    this.showingUserAlert = true;
  }

  showConfirmation( message: string ) {
    this.messageError = message;
    this.showingUserPanel = true;
  }

  hideAlert(){
    this.showingUserAlert = false;
  }

  hideConfirmation(){
    this.showingUserPanel = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (changedProp.isFirstChange()) {
        if(propName == "successMessage"){
          if(changedProp.currentValue != ""){
            this.hideAlert();
            this.showConfirmation(changedProp.currentValue);
            setTimeout( () => this.hideConfirmation(), 5000);
          }

        }else {
            //Error
        }
      } else {

      }
    }
  }

}
