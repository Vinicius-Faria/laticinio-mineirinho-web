import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { X } from 'chart.js/dist/chunks/helpers.core';
import { endWith, delay } from 'rxjs';
import { SaidaService } from '../../service/saidaService';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  @ViewChild("canvasQuantidade", { static: true }) elemento!: ElementRef;
  @ViewChild("canvasValores", { static: true }) elementoValor!: ElementRef;

  data : any = [];
  saidaQuantidade : any = [];
  entradaQuantidade : any = [];
  valorTotal : any = [];
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
    this.saidaService.getQuantidadeSaida().subscribe(
      success => {
        setTimeout(() => {
          this.data = success.data;
          this.saidaQuantidade = success.quantidade;
        }, 1000)
      },
    );
    this.saidaService.getQuantidadeEntrada().subscribe(
      success => {
        setTimeout(() => {
          this.data = success.data;
          this.entradaQuantidade = success.quantidade;
          this.graficoQuantidade();
        }, 1500)
      },
    );
    this.saidaService.getValorSaida().subscribe(
      success => {
        setTimeout(() => {
          this.data = success.data;
          this.valorTotal = success.quantidade;
          this.graficoValor();
        }, 1000)
      },
    );
  }

  graficoQuantidade(){
    this.loading = false;
    new Chart(this.elemento.nativeElement, {
      type: 'bar',
      
      data: {
        labels: this.data,
        datasets: [
          {
            label: 'Saída ',
            data: this.saidaQuantidade,
            backgroundColor: 'rgb(142, 237, 179)',
          },
          {
            label: 'Entrada',
            data: this.entradaQuantidade,
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

  graficoValor(){
    this.loading = false;
    new Chart(this.elementoValor.nativeElement, {
      type: 'bar',
      
      data: {
        labels: this.data,
        datasets: [
          {
            label: 'Total',
            data: this.valorTotal,
            backgroundColor: 'rgb(142, 237, 179)',
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
