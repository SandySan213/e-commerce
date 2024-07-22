import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from 'src/app/models/cart';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Cart[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: value => {
        this.cartItems = value;
        this.totalPrice = this.getTotalPrice();
      },
      error: err => {
        console.log(err);
      }
    }
    )
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  clearCarts(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.snackbar.open("The cart is cleared !","",{
          duration:500,
          horizontalPosition:'center',
          verticalPosition:"top"
        })
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000
    )
  }

  checkOut(): void {

    return this.clearCarts();
  }


}
