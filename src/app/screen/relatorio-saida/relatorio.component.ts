import { Component, OnInit } from '@angular/core';
import { Produto } from '../entity/produto';
import { ProdutoService } from '../../service/produtoService';
import { RelatorioSaida } from '../entity/relatorioSaida';
import { RelatorioService } from '../../service/relatorioService';
import { getContentTypeFromResponse, saveFile } from '../util/file-download-util';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  produto: Produto[] = [];
  produtoSelected = '';
  all = false;
  dataInicio = "";
  dataFim = "";
  relatorioSaida: RelatorioSaida;
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  constructor(
    private service: ProdutoService,
    private serviceRelatorio: RelatorioService,
    private _snackBar: MatSnackBar
  ) {
    this.relatorioSaida= new RelatorioSaida();
   }

   async ngOnInit() {
    try {
      this.loading = true;
      this.service.getProduto().subscribe(
        resposta => this.produto = resposta
      )
      this.loading = false;
    } catch (error) {}
  }

  onSubmit(){
    this.loading = true;

    if(this.all === true){
      this.relatorioSaida.nome = 'Todos';
      this.relatorioSaida.dataInicio = this.dataInicio;
      this.relatorioSaida.dataFim = this.dataFim;
    }else{
      this.relatorioSaida.nome = this.produtoSelected;
      this.relatorioSaida.dataInicio = this.dataInicio;
      this.relatorioSaida.dataFim = this.dataFim;
    }

    if(!this.relatorioSaida.nome){
      this.openSnackBar('Selecione um produto ou todos','OK');
      this.loading = false;
      return;
    }

    if(!this.dataFim || !this.dataInicio){
      this.openSnackBar('Data Inválida','OK');
      this.loading = false;
      return;
    }

    this.serviceRelatorio.getRelatorioVenda(this.relatorioSaida).subscribe(
      success =>{
        if (success.body.size) {
          this.loading = false;
          const blob = new Blob([success.body]);
          const contentType = getContentTypeFromResponse(success);
          saveFile(blob, "Relatorio.pdf", contentType);
        }
      }
    )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
  }

}
