import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

export const routes: Routes = [
    {
      path: '',
      component: AuthComponent,
      children: [
        {
            path: '',
            redirectTo: 'cart',
            pathMatch: 'full'
        },
        {
          path: 'cart',
          component: CartComponent
        },
        {
            path: 'order-summary',
            component: OrderSummaryComponent
          },
      ]
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {
}