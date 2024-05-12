import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { CartService } from "../order/cart/cart.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userLoggedIn: boolean = false;
  cartCount: number = 0;

  constructor(private router: Router,
              private auth: AngularFireAuth,
              private cartService: CartService) {}


  ngOnInit(): void {
    this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.userLoggedIn = true;
        this.cartService.getCartSize(userAuth.uid)
        .subscribe((size: number) => {
          this.cartCount = size;
        });
      } else {
        this.userLoggedIn = false;
      }
    });
  } 

  navigateToAccount() {
    this.router.navigate(['/profile']);
  }

navigateHome() {
  this.router.navigate(['/home']);
}

navigateToLogin() {
  this.router.navigate(['/auth']);
}

navigateToCart() {
  this.router.navigate(['/order/cart']);
}
}
