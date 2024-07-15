import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { User } from '../shared/model/user.model';
import { ProductsComponent } from './components/products/products.component';
import { Auth } from '../auth/service/login.model';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { ProductsToBuyComponent } from '../products-to-buy/products-to-buy.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MenuComponent,
    CadastroComponent,
    CadastroComponent,
    ProductsComponent,
    LoadingComponent,
    ProductsToBuyComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public perfil = true;
  public product = false;
  public type: string | null = null;
  public isLoading: boolean = false;

  ngOnInit(): void {
    const auth: Auth = JSON.parse(localStorage.getItem('auth') || '');
    this.type = auth.authorities[0].authority.split('_')[1];
  }
}
