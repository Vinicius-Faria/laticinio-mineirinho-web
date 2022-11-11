import { Component, OnInit } from '@angular/core';
import { Produto } from '../entity/produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto;

  constructor() { 
    this.produto = new Produto();
  }

  ngOnInit(): void {

  }

  onSubmit(){
    
  }

  cancel(){

  }

}
