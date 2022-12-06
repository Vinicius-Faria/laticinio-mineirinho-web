import { Component, OnInit } from '@angular/core';
import { RelatorioSaida } from '../entity/relatorioSaida';
import { ProdutoService } from '../../service/produtoService';
import { RelatorioService } from '../../service/relatorioService';
import { Produto } from '../entity/produto';
import { getContentTypeFromResponse, saveFile } from '../util/file-download-util';
import { MatSnackBarHorizontalPosition, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-relatorio-entrada',
  templateUrl: './relatorio-entrada.component.html',
  styleUrls: ['./relatorio-entrada.component.css']
})
export class RelatorioEntradaComponent implements OnInit {

  produto: any = [];
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
    this.produto = new Produto();
    this.relatorioSaida= new RelatorioSaida();
   }

   async ngOnInit() {
    try {
      this.loading = true;
      this.produto = await this.service.getProduto().toPromise();
      this.loading = false;
    } catch (error) {}
  }

  onSubmit(){
    this.loading = true;

    if(!this.dataFim || !this.dataInicio){
      this.openSnackBar('Data Inválida','OK');
      this.loading = false;
      return;
    }

    if(this.all === true){
      this.relatorioSaida.nome = 'Todos';
      this.relatorioSaida.dataInicio = this.dataInicio;
      this.relatorioSaida.dataFim = this.dataFim;
    }else{
      this.relatorioSaida.nome = this.produtoSelected;
      this.relatorioSaida.dataInicio = this.dataInicio;
      this.relatorioSaida.dataFim = this.dataFim;
    }

    this.serviceRelatorio.getRelatorioEntrada(this.relatorioSaida).subscribe(
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
