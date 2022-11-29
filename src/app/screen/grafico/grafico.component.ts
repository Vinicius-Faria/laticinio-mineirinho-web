import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { X } from 'chart.js/dist/chunks/helpers.core';
import { endWith } from 'rxjs';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  @ViewChild("canvasQuantidade", { static: true }) elemento!: ElementRef;



  constructor() {
    Chart.register(...registerables);
   }

  ngOnInit() {
    this.graficoQuantidade();
  }

  graficoQuantidade(){
    new Chart(this.elemento.nativeElement, {
      type: 'bar',
      
      data: {
        labels: ["23/11/2022","24/11/2022","25/11/2022","26/11/2022","27/11/2022","28/11/2022","29/11/2022"],
        datasets: [
          {
            label: 'Produtos Vendidos',
            data: [15,20,13,18,35,18.5,20.1],
            backgroundColor: 'rgb(254, 103, 1, 0.5)',
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
