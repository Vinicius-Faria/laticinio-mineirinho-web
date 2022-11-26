import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { Produto } from '../entity/produto';
import { Saida } from '../entity/saida';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css']
})
export class SaidaComponent implements OnInit {

  card: any = [];
  produto: any = [];
  produtoSelected = '';
  quantidade = '';
  preco = '';
  saidaForm : Saida;
  valorTotal = 0;

  constructor(
    private service: ProdutoService,
  ) { 
    this.produto = new Produto();
    this.saidaForm = new Saida();
  }

  async ngOnInit() {
    try {
      this.produto = await this.service.getProduto().toPromise();
    } catch (error) {
      
    }
  }

  onSubmit(){
    this.saidaForm.nome = this.produtoSelected;
    this.saidaForm.preco = this.preco;
    this.saidaForm.quantidade = this.quantidade;
    this.saidaForm.total = String((Number(this.preco) * Number(this.quantidade)).toFixed(2)).toString();

    this.card.push({
    ...this.saidaForm
    });


    this.preco = '';
    this.quantidade = '';

    this.valorTotal = this.valorTotal + Number(this.saidaForm.total);
  }

  updateValues(){

    this.produto.forEach((element: Produto) => {
      if(element.nome == this.produtoSelected.toString()){
        this.preco = element.preco;
      }
    });

  }

  adcionarCard(){

  }

  retirarCard(card: any){
    this.card.forEach((element: any) => {
      if(element.nome == card.nome){
        this.card.splice(this.card.indexOf(element), 1);
        this.valorTotal = (Number(this.valorTotal) - Number(element.preco * element.quantidade));
      }
    });



  }

  alteraPontuacao(){
    this.quantidade = this.quantidade.valueOf().replace(',', '.');
  }

}
