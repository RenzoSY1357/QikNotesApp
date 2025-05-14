import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NotasServicio } from '../../servicio/servicio';
import { Nota } from '../../modelo/modelo';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas',
  imports: [FormsModule, CommonModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})

export class NotasComponent {

  TituloNota: string = '';
  ContenidoNota: string = '';

  addNota() {
    if (this.TituloNota.trim() && this.ContenidoNota.trim()){
      // Si se llena el titulo nota, y el Contenido de la nota, cuando se presione en el boton +, se lleva al servicio de notas
      this.notasServicio.addNota({
          title: this.TituloNota,
          content: this.ContenidoNota
          // groupId: si se aniade soporte para grupos
      });

      //Limpia el contenido y el titulo de la nota, para la siguiente nota
      this.TituloNota = '';
      this.ContenidoNota = '';
    }
  }

  // Hacemos lo mismo con grupos, un Array de Notas, filtrando los tipos
  notas: Nota[] = [];

  constructor(private notasServicio: NotasServicio){
    this.notasServicio.notas$.subscribe(notas => this.notas = notas);
  }

  eliminarNota (id: number) {
    this.notasServicio.deleteNota(id);
  }

}
