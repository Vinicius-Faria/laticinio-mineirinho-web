import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Produto } from '../entity/produto';
import { EntradaService } from '../../service/entradaService';
import { delay } from 'rxjs';

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
    private _snackBar: MatSnackBar
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
    this.produto.id = card.id;
    this.produto.nome = card.nome;
    this.produto.preco = card.preco;
    this.produto.minimo = card.minimo;
    this.produto.codigo = card.codigo;

    this.produto.descricao = card.descricao;
    window.scrollTo(0,0)
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
