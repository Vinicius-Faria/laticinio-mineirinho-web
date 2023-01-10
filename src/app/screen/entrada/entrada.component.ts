import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Produto } from '../entity/produto';
import { EntradaService } from '../../service/entradaService';
import { delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EntradaFormComponent } from './entrada-form/entrada-form.component';

export interface DialogData {
  id: string,
  nome: string,
  preco: string,
  minimo: string,
  codigo: string,
  quantidade: string,
  descricao: string
}

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  card: any = [];
  cardCompleto : any = [];
  produto: Produto;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  loading = false;
  searchByName = '';
  backList : Boolean = false;

  constructor(
    private service: ProdutoService,
    private serviceEntrada: EntradaService,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog
  ) {
    this.produto = new Produto();
  }

  async ngOnInit() {
    try {
      this.loading = true;
      this.card = await this.service.getProduto().toPromise();

      delay(300);
      this.cardCompleto = await this.card;

      this.loading = false;
    } catch (error) {
      
    }
  }

  adcionarEstoque(card: any) {

    const dialogRef = this.dialog.open(EntradaFormComponent, {
      data: {
        id: card.id,
        nome: card.nome,
        preco: card.preco,
        minimo: card.minimo,
        codigo: card.codigo,
        descricao: card.descricao
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.produto.id = result.id;
        this.produto.nome = result.nome;
        this.produto.preco = result.preco;
        this.produto.minimo = result.minimo;
        this.produto.codigo = result.codigo;
        this.produto.quantidade = result.quantidade;
        this.produto.descricao = result.descricao;
        this.onSubmit();
      }
    });

  }

  async refresh() {
    this.card = await this.service.getProduto().toPromise();
    this.loading = false;
  }

  onSubmit(){

    if(this.produto.quantidade == '' || this.produto.quantidade == null){
      this.openSnackBar('Entrada sem nenhum valor','OK');
      return;
    }

    this.loading = true;
    this.serviceEntrada.save(this.produto).subscribe(
      success => {
          this.openSnackBar('Entrada Salva','OK');
          this.produto.nome = '';
          this.produto.descricao = '';
          this.produto.preco = '';
          this.produto.codigo = '';
          this.produto.quantidade = '';
          this.produto.minimo = '';
          this.produto.codigo = '';
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

  onSearch(string : String){

    let cardSearch = new  Array();
    if(string == ''){
      this.openSnackBar('Digite uma palavra para usar como filtro.','OK');
      return;
    }

    this.card = null;
    this.loading = true;

    this.cardCompleto.forEach(async (element : Produto) => {
      if(element.nome.toUpperCase().includes(string.toString().toUpperCase())){
          cardSearch.push(element);
          this.backList = true;
        }
    });

    this.card = cardSearch;
    if(this.card == null || this.card.length == 0 ){
      this.openSnackBar('Não foi possivel encontrar nenhum produto com : ' + string,'OK');
      this.loading = false;
      this.card = this.cardCompleto;
      this.backList = false;
      return;
    }

    this.loading = false;
  }

  onBackList(){
    this.searchByName = '';
    this.card = this.cardCompleto;
    this.backList = false;
  }

  onExit(){
    this.produto.id = 0;
  }

}
