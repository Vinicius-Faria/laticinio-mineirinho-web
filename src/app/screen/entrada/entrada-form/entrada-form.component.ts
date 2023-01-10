import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../entrada.component';

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css']
})
export class EntradaFormComponent implements OnInit{

  return = 'retornando';
  quantidade = '';
  preco = '';

  constructor(
    public dialogRef: MatDialogRef<EntradaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
   this.preco = this.data.preco;
  }

  onSave(){
    this.data.quantidade = this.quantidade;
    this.data.preco = this.preco;
  }

}
