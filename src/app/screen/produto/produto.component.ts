import { Component, OnInit } from '@angular/core';
import { Produto } from '../entity/produto';
import { ProdutoService } from '../../service/produtoService';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarHorizontalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  card: any = [];
  item: any;
  produto: Produto;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  color: ThemePalette = "accent";
  mode: ProgressBarMode = 'determinate';
  value = 100;
  bufferValue = 75;

  constructor(
    private service: ProdutoService,
    private _snackBar: MatSnackBar
  ) { 
    this.produto = new Produto();
  }

  async ngOnInit() {
    try {
      this.mode = "indeterminate";
      this.card = await this.service.getProduto().toPromise();
      this.mode = "determinate";
    } catch (error) {
      
    }
  }

  onSubmit(){

    if (!this.produto.id) {
    this.mode = "indeterminate";
      this.service.save(this.produto).subscribe(
        success => {
          if(!success){
            this.mode = "indeterminate";
            this.openSnackBar('Produto Salvo','OK');
            this.produto.nome = '';
            this.produto.descricao = '';
            this.produto.preco = '';
            this.produto.codigo = '';
            this.produto.quantidade = '';
            this.produto.id = 0;
            this.refresh();
          }else{
            this.mode = "indeterminate";
            this.openSnackBar('Erro ao Atualizar','OK');
          }
        },
      );
    } else {
      this.service.atualizar(this.produto).subscribe(
        success => {
          if(!success){
            this.mode = "indeterminate";
            this.openSnackBar('Produto Atualizado','OK');
            this.produto.nome = '';
            this.produto.descricao = '';
            this.produto.preco = '';
            this.produto.codigo = '';
            this.produto.id = 0;
            this.produto.quantidade = '';
            this.produto.minimo = '';
            this.refresh();
          }else{
            this.mode = "indeterminate";
            this.openSnackBar('Erro ao Atualizar','OK');
          }
        }
      )
    }
    
  }
  
  async refresh() {
    this.card = await this.service.getProduto().toPromise();
    this.mode = "determinate";
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
    this.mode = "determinate";
  }

  editarCadastro(card: any) {
    this.mode = "indeterminate"
    this.produto.id = card.id;
    this.produto.nome = card.nome;
    this.produto.preco = card.preco;
    this.produto.descricao = card.descricao;
    this.produto.codigo = card.codigo;
    this.produto.minimo = card.minimo;
    this.produto.quantidade = card.quantidade;
  }
}
