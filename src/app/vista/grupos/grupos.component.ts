import { Component, Output, EventEmitter } from '@angular/core';

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

 // Con EventEmitter, se declara el evento, para ser escuchado con "[]"
  @Output () grupoSeleccionado = new EventEmitter<{ id: number, name:string }>();

  // Injectamos las notasServicio al Componente, en este caso al array de grupos, cada vez que el servicio se actualiza, el array tambien
  constructor(private notasServicio: NotasServicio){
    this.notasServicio.grupos$.subscribe(grupos$ => this.grupos = grupos$);
  }

  // Generamos un prompt para crear un grupo, llamando a la funcion del servicio addGrupo
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

  //Se emiten las propiedades del grupo
  seleccionarGrupo(grupo: Grupo){
    this.grupoSeleccionado.emit({id: grupo.id, name: grupo.name});
  }
}
