import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';

@Component({
  selector: 'app-controle-estoque',
  templateUrl: './controle-estoque.component.html',
  styleUrls: ['./controle-estoque.component.css']
})
export class ControleEstoqueComponent implements OnInit {

  card: any = [];
  dto: any = [];
  loading = false;

  constructor(
    private service: ProdutoService,
  ) { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.card = await this.service.getProdutoControle().toPromise();
      this.loading = false;
    } catch (error) {
      
    }
  }

}
