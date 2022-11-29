import { Component, OnInit } from '@angular/core';
import { Produto } from '../entity/produto';
import { ProdutoService } from '../../service/produtoService';
import { RelatorioSaida } from '../entity/relatorioSaida';
import { RelatorioService } from '../../service/relatorioService';
import { getContentTypeFromResponse, saveFile } from '../util/file-download-util';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  produto: any = [];
  produtoSelected = '';
  all = false;
  dataInicio = "";
  dataFim = "";
  relatorioSaida: RelatorioSaida;

  constructor(
    private service: ProdutoService,
    private serviceRelatorio: RelatorioService,
  ) {
    this.produto = new Produto();
    this.relatorioSaida= new RelatorioSaida();
   }

   async ngOnInit() {
    try {
      this.produto = await this.service.getProduto().toPromise();
    } catch (error) {}
  }

  onSubmit(){

    if(this.all === true){
      this.relatorioSaida.nome = 'Todos';
      this.relatorioSaida.dataInicio = this.dataInicio;
      this.relatorioSaida.dataFim = this.dataFim;
    }else{
      this.relatorioSaida.nome = this.produtoSelected;
      this.relatorioSaida.dataInicio = this.dataInicio;
      this.relatorioSaida.dataFim = this.dataFim;
    }

    this.serviceRelatorio.getRelatorioVenda(this.relatorioSaida).subscribe(
      success =>{
        if (success.body.size) {
          const blob = new Blob([success.body]);
          const contentType = getContentTypeFromResponse(success);
          saveFile(blob, "Relatorio.pdf", contentType);
        }
      }
    )

  }

}
