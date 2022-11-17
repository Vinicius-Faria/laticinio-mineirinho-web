import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Produto } from '../entity/produto';
import { EntradaService } from '../../service/entradaService';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  card: any = [];
  produto: Produto;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  constructor(
    private service: ProdutoService,
    private serviceEntrada: EntradaService,
    private _snackBar: MatSnackBar
  ) {
    this.produto = new Produto();
  }

  async ngOnInit() {
    try {
      this.card = await this.service.getProduto().toPromise();
    } catch (error) {
      
    }
  }

  adcionarEstoque(card: any) {
    this.produto.id = card.id;
    this.produto.nome = card.nome;
    this.produto.preco = card.preco;

    this.produto.descricao = card.descricao;
    window.scrollTo(0,0)
  }

  async refresh() {
    this.card = await this.service.getProduto().toPromise();
  }

  onSubmit(){

    console.log(this.produto);

    this.serviceEntrada.save(this.produto).subscribe(
      success => {
          this.openSnackBar('Entrada Salva','OK');
          this.produto.nome = '';
          this.produto.descricao = '';
          this.produto.preco = '';
          this.produto.codigo = '';
          this.produto.quantidade = '';
          this.produto.id = 0;
          this.refresh();
      },
    );
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
  }

}
