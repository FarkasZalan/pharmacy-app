import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth/auth.component';
import { ProfileListComponent } from './profile-list/profile-list.component';

export const routes: Routes = [
    {
      path: '',
      component: AuthComponent,
      children: [
        {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
        },
        {
          path: 'list',
          component: ProfileListComponent
        },
      ]
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}