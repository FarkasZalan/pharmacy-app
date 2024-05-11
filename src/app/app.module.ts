import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppComponent } from './app.component';
import { environment } from '../envinronments/envinronment';
import { SuccessfullDialogComponent } from './successfull-dialog/successfull-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthComponent } from './auth/auth/auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './order/cart/cart.component';
import { OrderSummaryComponent } from './order/order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessfullDialogComponent,
    FooterComponent,
    HeaderComponent,
    AuthComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatDialogModule,
    AngularFirestoreModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    provideAnimationsAsync(), 
    AuthService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
