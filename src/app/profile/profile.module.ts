import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileListComponent,
    ProfileEditComponent,
    ProfileEditComponent
  ],
})
export class ProfileModule {
}