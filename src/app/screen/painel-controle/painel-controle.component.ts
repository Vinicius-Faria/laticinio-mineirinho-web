import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { Produto } from '../entity/produto';
import { SaidaService } from '../../service/saidaService';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  produto: Produto[] = [];
  saida: Produto[] = [];
  loading = false;

  constructor(
    private serviceProduto : ProdutoService,
    private serviceSaida : SaidaService
  ) { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.serviceProduto.getProdutoList().subscribe(
        resposta => this.produto = resposta
      );
      this.serviceSaida.getUltimaVenda().subscribe(
        resposta => this.saida = resposta
      );
      this.loading = false;
    } catch (error) {}
  }

}
