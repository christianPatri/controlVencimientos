import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../../../models/users/user';
import { UserService } from '../../../../services/users/user.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UsersGridComponent } from '../users-grid/users-grid.component';
import { UsersModalComponent } from '../users-modal/users-modal.component';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersCreateComponent, UsersGridComponent, UsersModalComponent, CommonModule, PageTitleComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  _newuser: User = new User();
  _userList: User[] = [];

  userSuccessMessage: string = "";
  errorUpdate: Subject<string> = new Subject<string>();

  _isLoading: Boolean = true;
  _pageTitle: string = "Administracion de usuarios";

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this._isLoading = true;
    this.getUsers();
  }

  handleCreateUser(newUser: User) {
    if (newUser) {
      this.userService.createUser(newUser).subscribe(
        (response: User) => {
          this._isLoading = true;
          this.userSuccessMessage = "Usuario Creado";
          this.getUsers()
      }, (err) => {
        this._isLoading = true;
        this.triggerErrorUpdate(err.error);
      });
    }
  }

  getUsers() {
    this.userService.getActiveUsers().subscribe(
      (users : User[]) => {
        this._userList = users;
        this._isLoading = false;
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  handleDeleteUser(userToDelete: User) {
    if (userToDelete) {
      this.userService.deleteUser(userToDelete).subscribe(
        (response: any) => {
          this.userSuccessMessage = "Usuario Eliminado";
          this._isLoading = true;
          this.getUsers();
      }, (err) => {
        this._isLoading = false;
        this.triggerErrorUpdate(err.error);
      });
    }
  }

  handleEditUser(userToEdit: User) {
    if (userToEdit) {
      this.userService.updateUser(userToEdit).subscribe(
        (response: User) => {
          this.userSuccessMessage = "Usuario Editado";
          this._isLoading = true;
          this.getUsers();
      }, (err) => {
        this._isLoading = false;
        this.triggerErrorUpdate(err.error);
      });
    }
  }

  triggerErrorUpdate(message: string): void {
    this.errorUpdate.next(message);
  }

}
