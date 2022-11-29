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

  data : any = [];
  saidaQuantidade : any = [];
  entradaQuantidade : any = [];
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
        this.data = success.data;
        this.saidaQuantidade = success.quantidade;
      },
    );
    this.saidaService.getQuantidadeEntrada().subscribe(
      success => {
        this.data = success.data;
        this.entradaQuantidade = success.quantidade;
        this.graficoQuantidade();
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
    
}
