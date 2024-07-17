import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Pedido } from '../../../shared/model/pedido.model';
import { PedidoService } from '../../../shared/services/pedido.service';
import { UserService } from '../../../shared/services/user.service';
import { asyncScheduler } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    LoadingComponent,
    ModalDeleteComponent,
    MatListModule,
    MatExpansionModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidoComponent implements OnInit, OnChanges {
  @Input() type: string | null = null;
  @Input() reloadPedido = false;

  @Output() setLoading = new EventEmitter();
  public isLoading: boolean = true;

  readonly panelOpenState = signal(false);

  constructor(
    private pedidoService: PedidoService,
    private productService: ProductService,
    private userService: UserService
  ) {}


  rowDef = ['nome', 'descricao', 'preco', 'quantidade'];
  pedidos: any[] = [];
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.loadPedido();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reloadPedido'].currentValue) {
      this.loadPedido();
    }
  }


  toDeliver(id: string) {
    this.setLoading.emit(true);
    this.pedidoService.deliver(id).subscribe({
      next: () => {
        this.loadPedido();
        this.setLoading.emit(false);
      },
      error: () => this.setLoading.emit(false),
    });
  }

  loadPedido(): void {
    this.setLoading.emit(true);
    this.isLoading = true;
    this.pedidos = [];
    this.pedidoService.getAllPedidos().subscribe({
      next: (data: Pedido[]) => {
        data = data.filter(
          (pedido) => pedido.status !== 'AGUARDANDO PAGAMENTO'
        );
        this.pedidos = data;
        data.forEach((pedido, i) => {
          pedido.itemList.forEach(async (item, j) => {
            Promise.all([
              this.productService.getProduct(item.produto).toPromise(),
              this.userService.getUser(pedido.cliente).toPromise(),
            ]).then(async ([p, u]) => {
              this.pedidos[i].clienteNome = u?.nome;
              this.pedidos[i].enderecoCompleto = u?.enderecoCompleto;

              this.pedidos[i].itemList[j] = {
                ...p,
                idPedido: pedido.identificador,
                quantidade: item.quantidade,
              };

              if (j === pedido.itemList.length - 1) {
                asyncScheduler.schedule(() => {
                  this.setLoading.emit(false);
                  this.isLoading = false;
                }, 1000);
              }
            });
          });
        });
      },
      error: () => this.setLoading.emit(false),
    });
  }
}
