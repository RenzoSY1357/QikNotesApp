import { Component } from '@angular/core';

import { NotasServicio } from '../../servicio/servicio';
import { Grupo } from '../../modelo/modelo';

import { CommonModule } from '@angular/common';
// CommonModulo, lo que hace es proveer directivas de angular como *ngFor
// ngFor se usa para desplegar listas repitiendo elementos


@Component({
  selector: 'app-grupos',
  imports: [CommonModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})

//Componentes de un grupo
export class GruposComponent {

  // Un array de grupos, que se pasan a traves de la interfaz, para validar los tipos
  grupos: Grupo[] = [];

  constructor(private notasServicio: NotasServicio){
    this.notasServicio.grupos$.subscribe(grupos => this.grupos = grupos);
  }

  // Crea un grupo
  crearGrupo(){

    const caracteresMaximos = 15;

    const nombre = prompt('Nombre del grupo');

    if (nombre) {

      if (nombre.length <= caracteresMaximos){
        this.notasServicio.addGrupo(nombre);
      } else {
        alert(`El nombre del grupo no puede exceder de ${caracteresMaximos} caracteres.`);
        this.crearGrupo();
      }
    }
  }

  // Eliminamos un grupo pasando su id y llamando a la funcion del servicio deleteGroup
  eliminarGrupo (id: number, event:Event){
    event.stopPropagation();

    this.notasServicio.deleteGroup(id);
  }
}
