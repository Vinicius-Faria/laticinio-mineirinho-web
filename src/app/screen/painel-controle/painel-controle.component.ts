import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { Produto } from '../entity/produto';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  produto: Produto[] = [];
  loading = false;

  constructor(
    private serviceproduto : ProdutoService,
  ) { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.serviceproduto.getProdutoList().subscribe(
        resposta => this.produto = resposta
      );
      this.loading = false;
    } catch (error) {}
  }

}
