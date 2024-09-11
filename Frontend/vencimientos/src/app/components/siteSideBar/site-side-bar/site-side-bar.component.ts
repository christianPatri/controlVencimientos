import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../../services/session/session.service';
import { NgIf } from '@angular/common';
import { GenericModalComponent } from '../../common/modals/generic-modal/generic-modal.component';

@Component({
  selector: 'app-site-side-bar',
  standalone: true,
  imports: [RouterLink, NgIf, GenericModalComponent],
  templateUrl: './site-side-bar.component.html',
  styleUrl: './site-side-bar.component.css'
})
export class SiteSideBarComponent {

  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Salir de sesion";



  constructor(private sessionService: SessionService) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.logout();
  }

  isLoggedIn() {
    return this.sessionService.isAuthenticated();
  }

  hasRole(role: string) {
    let roles = [];
    roles.push(role);

    return this.sessionService.hasRole(roles);
  }

  openSubmitModal() {
    this.submitModal.openModal();
  }

  handleSubmitModalEvent(event: boolean){
    if(event == false){
      this.submitModal.closeModal();
    } else{
      this.logout();
    }
  }

}
