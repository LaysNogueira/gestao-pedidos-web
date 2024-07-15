import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../shared/model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-to-buy',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, LoadingComponent, CommonModule],
  providers: [ProductService],
  templateUrl: './products-to-buy.component.html',
  styleUrl: './products-to-buy.component.scss',
})
export class ProductsToBuyComponent implements OnInit {
  public products: Product[] = [];
  public isLoading: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.products = [
      {
        nome: 'Produto 1',
        descricao: 'Descrição do Produto 1',
        preco: 29.99,
        qtdEstoque: 100,
      },
      {
        nome: 'Produto 2',
        descricao: 'Descrição do Produto 2',
        preco: 39.99,
        qtdEstoque: 150,
      },
      {
        nome: 'Produto 3',
        descricao: 'Descrição do Produto 3',
        preco: 19.99,
        qtdEstoque: 200,
      },
      {
        nome: 'Produto 4',
        descricao: 'Descrição do Produto 4',
        preco: 49.99,
        qtdEstoque: 80,
      },
      {
        nome: 'Produto 5',
        descricao: 'Descrição do Produto 5',
        preco: 24.99,
        qtdEstoque: 120,
      },
      {
        nome: 'Produto 6',
        descricao: 'Descrição do Produto 6',
        preco: 34.99,
        qtdEstoque: 60,
      },
      {
        nome: 'Produto 7',
        descricao: 'Descrição do Produto 7',
        preco: 44.99,
        qtdEstoque: 90,
      },
      {
        nome: 'Produto 8',
        descricao: 'Descrição do Produto 8',
        preco: 54.99,
        qtdEstoque: 110,
      },
      {
        nome: 'Produto 9',
        descricao: 'Descrição do Produto 9',
        preco: 14.99,
        qtdEstoque: 130,
      },
      {
        nome: 'Produto 10',
        descricao: 'Descrição do Produto 10',
        preco: 64.99,
        qtdEstoque: 70,
      },
      {
        nome: 'Produto 11',
        descricao: 'Descrição do Produto 11',
        preco: 74.99,
        qtdEstoque: 50,
      },
      {
        nome: 'Produto 12',
        descricao: 'Descrição do Produto 12',
        preco: 84.99,
        qtdEstoque: 40,
      },
      {
        nome: 'Produto 13',
        descricao: 'Descrição do Produto 13',
        preco: 94.99,
        qtdEstoque: 30,
      },
      {
        nome: 'Produto 14',
        descricao: 'Descrição do Produto 14',
        preco: 104.99,
        qtdEstoque: 20,
      },
      {
        nome: 'Produto 15',
        descricao: 'Descrição do Produto 15',
        preco: 114.99,
        qtdEstoque: 10,
      },
    ];
    // this.isLoading = true;
    // this.productService.getProducts().subscribe({
    //   next: (data: Product[]) => {
    //     this.products = data;
    //   },
    //   error: () => (this.isLoading = false),
    //   complete: () => (this.isLoading = false),
    // });
  }

  addToCart() {
    if (!localStorage.getItem('token')) this.router.navigate(['/login']);
  }
}
