import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.module')
            .then(m => m.PagesModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module')
          .then(m => m.AuthModule)  
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module')
          .then(m => m.ProfileModule),
          canActivate: [AuthGuard],
      },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
  }
  
