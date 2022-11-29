import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  constructor() {
    Chart.register(...registerables);
   }

  ngOnInit() {
    this.grafico();
  }

  grafico(){
    new Chart(this.elemento.nativeElement, {
      type: 'bar',
      
      data: {
        labels: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho"],
        datasets: [
          {
            label: 'Teste',
            data: [85,72,86,81,84,86,110],
            backgroundColor: '#00AEFF',
            borderWidth: 2
          },
        ]
      },
      options: {
        scales:{
          y:{
            beginAtZero: true
          }
        }
      }
    });
  }
    
}
