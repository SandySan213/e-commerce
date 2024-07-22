import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';

  constructor(private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: value => {
        this.products = value;
        this.filteredProducts = value;
      },
      error: err => console.log(err)
    }
    )
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open(`Added ${product.name.toUpperCase()} to cart !.`, "",
          {
            duration: 2000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
          })
      },
      error: err => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredProducts = this.products.filter(product =>
      product.name.toLocaleLowerCase().startsWith(searchTerm))
      this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue

    if (this.sortOrder === "priceLowHigh") {
      this.filteredProducts.sort((a, b) => a.price - b.price)

    }
    else if (this.sortOrder === "priceHighLow") {
      this.filteredProducts.sort((a, b) => b.price - a.price)
    }
  }

}



