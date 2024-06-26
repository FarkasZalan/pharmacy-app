import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

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
    {
      path: 'order',
      loadChildren: () => import('./order/order.module')
        .then(m => m.OrderModule),
        canActivate: [AuthGuard],
  },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
  }
  
