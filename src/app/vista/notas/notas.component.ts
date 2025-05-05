import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';
// FormsModule, abilita el soporte de formulario y el uso de [(ngModel)]

import { NotasServicio } from '../../servicio/servicio';
import { Nota } from '../../modelo/modelo';
import { Grupo } from '../../modelo/modelo';

import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-notas',
  imports: [FormsModule, CommonModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})

export class NotasComponent {

  mostrarSelectorGrupo: boolean = false;
  notaPendiente: { id?: number, title: string, content: string } | null = null;

  // Esto es para la para la vista de seleccion del grupo al guardar una nota
  grupos: Grupo[] = [];
  @Input()  grupoSeleccionadoId: number | null = null; //Esto asigna la nota al grupo, en este caso al array del Grupo
  @Input() grupoSeleccionadoNombre: string | null = null;
  @Output() volver = new EventEmitter<void>();

  // Hacemos lo mismo con grupos, un Array de Notas, filtrando los tipos
  notas: Nota[] = [];
  TituloNota: string = '';
  ContenidoNota: string = '';

  // Esto es para el boton de edicion de nota
  editarNotaId: number | null = null; //Se selecciona el id de la nota a editar o un null, si es que no se edita nada, por default esta en null (los '=' significa el valor inicial)
  // editarTitulo: string = '';
  // editarContenido: string = '';

  grupoNotaEdicion: number | null = null;

  addNota() {
    if (this.TituloNota.trim() && this.ContenidoNota.trim()){
      // Si se llena el titulo nota, y el Contenido de la nota, cuando se presione en el boton +, se lleva al servicio de notas
      this.notasServicio.addNota({
          title: this.TituloNota,
          content: this.ContenidoNota,

          // groupId: si se aniade soporte para selecionar las notas a los grupos.
          // Esto como es un objeto, lo que hace, con ?? es, si no hay un grupo seleccionado, se asigna undefined
          groupId: this.grupoSeleccionadoId ?? undefined
          // (a) ?? (b), devuelve (a), si (a) NO es null, si (a) es null, devuelve (b), en este caso (b), es undefined.

          //*undefined, no es lo mismo que null
          // undefined: significa que la propiedad no tiene valor, o no existe (esta ausente)
          // null: significa que la propiedad existe, pero su valor es "vacio" o "nulo" (aparecera con un null)
      });

      //Limpia el contenido y el titulo de la nota, para la siguiente nota
      this.TituloNota = '';
      this.ContenidoNota = '';
      this.grupoNotaEdicion = null;

    }
  }

  constructor(private notasServicio: NotasServicio){
    this.notasServicio.notas$.subscribe(notas => this.notas = notas);
    this.notasServicio.grupos$.subscribe(grupos => this.grupos = grupos);
  }

  eliminarNota (id: number) {
    this.notasServicio.deleteNota(id);
  }

  editarNota(nota: Nota){
    this.editarNotaId = nota.id;
    this.TituloNota = nota.title;
    this.ContenidoNota = nota.content;

    // Carga el grupo al editar la nota
    this.grupoNotaEdicion = nota.groupId ?? null;
  }

  guardarNota(id: number){
    this.notasServicio.updateNota({
      id,
      title: this.TituloNota,
      content: this.ContenidoNota,
      groupId: this.grupoNotaEdicion ?? this.grupoSeleccionadoId ?? undefined
    });

    //Limpia, para una nueva edicion
    this.editarNotaId = null;
    this.TituloNota = '';
    this.ContenidoNota = '';
    this.grupoNotaEdicion = null;

  }

  cancelarEdicion(){
    this.editarNotaId =null;
    this.TituloNota = '';
    this.ContenidoNota = '';
    this.grupoNotaEdicion = null;
  }

  get notasFiltradas(): Nota[] {
    if (this.grupoSeleccionadoId == null){
      return this.notas.filter( n => !n.groupId);
    }
    return this.notas.filter(n => n.groupId === this.grupoSeleccionadoId)
  }

  abrirSelectorGrupo(nota: Nota){
    this.notaPendiente = nota;
    this.mostrarSelectorGrupo = true;
  }

  asignarNotaAGrupo(grupoId: number | null){
    if (this.notaPendiente && typeof this.notaPendiente.id === 'number'){
        this.notasServicio.updateNota({
          id: this.notaPendiente.id,
          title: this.notaPendiente.title,
          content: this.notaPendiente.content,
          groupId: grupoId ?? undefined
        });
    }
    this.resetForm();
  }

  cancelarSelectorGrupo(){
    this.mostrarSelectorGrupo = false;
    this.notaPendiente = null;
  }

  resetForm() {
    this.mostrarSelectorGrupo = false;
    this.notaPendiente = null;
    this.TituloNota = '';
    this.ContenidoNota = '';
    this.editarNotaId = null;
  }


  notaSeleccionada: Nota | null = null;

  seleccionarNota(nota: Nota){
    this.notaSeleccionada = nota;
  }

  cerrarNotaSeleccionada(){
    this.notaSeleccionada = null;
  }

  limpiarNotas() {
    this.notasServicio.clearNotas();
  }
}
