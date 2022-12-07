import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SaidaService } from '../../../service/saidaService';
import { registerables, Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-painel',
  templateUrl: './grafico-painel.component.html',
  styleUrls: ['./grafico-painel.component.css']
})
export class GraficoPainelComponent implements OnInit {

  @ViewChild("canvasPagamento", { static: true }) elemento!: ElementRef;

  data : any = [];
  pagamentoDinheiro : any = [];
  pagamentoCartao : any = [];
  loading = false;

  constructor(
    private saidaService: SaidaService
  ) {
    Chart.register(...registerables);
   }

   ngOnInit() {
    this.loading = true;
    this.geraGrafico();
  }

  geraGrafico(){
    this.loading = true;
    this.saidaService.getPagamentoDinheiro().subscribe(
      success => {
        setTimeout(() => {
          this.data = success.data;
        this.pagamentoDinheiro = success.quantidade;
        }, 1000)
      },
    );
    this.saidaService.getPagamentoCartao().subscribe(
      success => {
        setTimeout(() => {
          this.data = success.data;
          this.pagamentoCartao = success.quantidade;
          this.graficoValor();
        }, 1500)
      },
    );
  }

  graficoValor(){
    this.loading = false;
    new Chart(this.elemento.nativeElement, {
      type: 'bar',
      
      data: {
        labels: this.data,
        datasets: [
          {
            label: 'Dinheiro ',
            data: this.pagamentoDinheiro,
            backgroundColor: 'rgb(142, 237, 179)',
          },
          {
            label: 'Cartao',
            data: this.pagamentoCartao,
            backgroundColor: 'rgb(254, 103, 1, 0.8)',
          },
        ]
      },
      options: {
        scales:{
          y:{
            beginAtZero: true,
          },
        }
      }
    });
  }

}
