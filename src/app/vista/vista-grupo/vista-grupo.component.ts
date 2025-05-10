import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NotasServicio } from '../../servicio/servicio';
import { Nota } from '../../modelo/modelo';

@Component({
  selector: 'app-vista-grupo',
  imports: [CommonModule],
  templateUrl: './vista-grupo.component.html',
  styleUrl: './vista-grupo.component.css'
})

export class VistaGrupoComponent {

  // Recibe los inputs de [grupoId] y de [grupoNombre], al pasar a la vista del grupo seleccionado
  @Input() grupoId: number | null = null;
  @Input() grupoNombre: string | null = null;
  @Output() volver = new EventEmitter<void>(); //Event Emiter es un componente de Angular para emitir eventos personalizados

  notasGrupo: Nota[] = [];

  // Aca solo injectamos el servicio para usar sus datos, metodos, etc, no subscribimos nada
  constructor(private notasServicio: NotasServicio){}

  // el servicio NotasServicio, tienen un Observable notas$ que emite todas las notas cada vez que cambian, el componente se suscribe a ese observable para recibir los cambios
  // Cuando llegan nuevas notas, el compoennete filtra solo las notas que pertenecen al grupo actual y guarda ese resultado en su propia variable notasGrupo
  ngOnInit(){
    this.notasServicio.notas$.subscribe(notas$ => {this.notasGrupo = notas$.filter( n => n.groupId === this.grupoId)});
  }

  // Llama a la funcion del servicio para limpiar las notas del grupo, el cual se ha seleccionado [grupoId] (El id del grupo a limpiar)
  limpiarNotasGrupo() {
    if (this.grupoId !== null){
      this.notasServicio.clearNotas(this.grupoId);
    }
  }
  
  // Pasa por parametro el id de la nota a eliminar, y se elimina la nota llamando a la funcion del servicio eliminarNota
  eliminarNota(id: number){
    this.notasServicio.deleteNota(id);
  }
}
