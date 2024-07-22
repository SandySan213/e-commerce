import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Response } from '../models/response';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartApiUrl = environment.getCart();

  constructor(private http: HttpClient
  ) { }

  addToCart(Cart: Product): Observable<Cart> {
    return this.http.post<Cart>(this.cartApiUrl, Cart);
  }

  getCartItems(): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.cartApiUrl);
  }

  clearCart(): Observable<Response>{
    return this.http.delete<Response>(this.cartApiUrl);
  }

}
