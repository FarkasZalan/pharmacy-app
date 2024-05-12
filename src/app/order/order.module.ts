import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OrderRoutingModule,
    MatListModule,
    MatCardModule,
    MatIcon
  ],
  declarations: [
    CartComponent,
    OrderSummaryComponent,
    OrderConfirmationComponent
  ],
})
export class OrderModule {
}