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
      this.card = await this.service.getProduto().toPromise();
    } catch (error) {
      
    }
  }

  onSubmit(){

    this.mode = "indeterminate";
      this.service.save(this.produto).subscribe(
        success => {
          this.openSnackBar('Produto Salvo','OK');
          this.produto.nome = '';
          this.produto.descricao = '';
          this.produto.preco = 0;
          this.produto.codigo = '';
        },
      );
    
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
  }
}