import { Component, Input, Output, EventEmitter } from '@angular/core';
// El Input envia datos desde el componente padre, el Output envia datos hacia el componente padre
import { FormsModule } from '@angular/forms';
// FormsModule, abilita el soporte de formulario y el uso de [(ngModel)]

import { NotasServicio } from '../../servicio/servicio';
import { Nota } from '../../modelo/modelo';
import { Grupo } from '../../modelo/modelo';

import { CommonModule } from '@angular/common';
// CommonModulo, lo que hace es proveer directivas de angular como *ngFor, *ngIf, etc
// ngFor se usa para desplegar listas repitiendo elementos

@Component({
  selector: 'app-notas',
  imports: [FormsModule, CommonModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})

export class NotasComponent {

  mostrarSelectorGrupo: boolean = false;
  notaPendiente: { id?: number, title: string, content: string } | null = null;
  notaSeleccionada: Nota | null = null;

  // Estos son los grupos de la vista de "seleccion de grupo" cuando se guarda una nota
  grupos: Grupo[] = [];

  // Con EventEmitter<>, volver se vuelve un evento, para poder ser emitido(escuchado), pero para que se escuche realmente(se emita), tienes que agregar @Output, basicamente envia datos
  @Output() volver = new EventEmitter<void>(); //EventEmitter solo crea un valor capaz de emitir eventos, con @Output, los eventos pueden ser transmitidos
 // Esta vacio, por que no envia ningun data, solo una señal que se escucha en "app.component" (volver)="volverAVistaPrincipal", es como un boton inalambrico para ejecutar la funcion volverAVistaPrincipal

  // Hacemos lo mismo con grupos, un Array de Notas, filtrando los tipos
  notas: Nota[] = [];
  TituloNota: string = '';
  ContenidoNota: string = '';

  // Esto es para el boton de edicion de nota
  editarNotaId: number | null = null; //Se selecciona el id de la nota a editar o un null, si es que no se edita nada, por default esta en null (los '=' significa el valor inicial)


  // Necesitas inyectar NotasServicio, para poder usar todos sus datos, metodos, etc, y poder suscribir las notas y los grupos al servicio
  constructor(private notasServicio: NotasServicio){
    this.notasServicio.notas$.subscribe(notas$ => this.notas = notas$);
    this.notasServicio.grupos$.subscribe(grupos$ => this.grupos = grupos$);
  }

  //La funcion REAL para añadir una nota, (+), usando el addNota de notas servicio, añade la Nota
  addNota() {

    if (this.TituloNota.trim() && this.ContenidoNota.trim()){

      // Si se llena el titulo nota, y el Contenido de la nota, cuando se presione en el boton +, se lleva al servicio de notas
      this.notasServicio.addNota({

        title: this.TituloNota,
        content: this.ContenidoNota,

        // groupId: si se aniade soporte para selecionar las notas a los grupos.
        // Esto como es un objeto, lo que hace, con ?? es, si no hay un grupo seleccionado, se asigna undefined
        groupId: undefined
        // (a) ?? (b), devuelve (a), si (a) NO es null, si (a) es null, devuelve (b), en este caso (b), es undefined.

        //*undefined, no es lo mismo que null
        // undefined: significa que la propiedad no tiene valor, o no existe (esta ausente)
        // null: significa que la propiedad existe, pero su valor es "vacio" o "nulo" (aparecera con un null)
      });

      //Limpia el contenido y el titulo de la nota, para la siguiente nota
      this.TituloNota = '';
      this.ContenidoNota = '';

    }
  }

  // Elimina la nota usando pasando un id, y usando la funcion del servicio deleteNota
  eliminarNota (id: number) {
    this.notasServicio.deleteNota(id);
  }

  // Al presionar en (edit, muestra el contenido de la nota que se va a editar, en el formulario
  editarNota(nota: Nota){

    this.editarNotaId = nota.id;
    this.TituloNota = nota.title;
    this.ContenidoNota = nota.content;

  }

  cancelarEdicion(){

    this.editarNotaId =null;
    this.TituloNota = '';
    this.ContenidoNota = '';
  }

  // Se pasa como parametro el id de la nota en edicion y guarda la nota en edicion.
  guardarNota(id: number){

    this.notasServicio.updateNota({
      id,
      title: this.TituloNota,
      content: this.ContenidoNota,
      groupId: undefined
    });

    //Limpia, para una nueva edicion
    this.resetForm()
  }

  // Es un getter filtrador de notas, basicamente quita las notas que ya estan guardadas(Que ya tienen grupo) de la lista de notas
  // Se usa un getter, ya que en Angular los getters, se pueden usar como propiedades, en este caso en "let nota of notasFiltradas"
  get notasFiltradas(): Nota[] { //Devuelve un array de notas
   return this.notas.filter( n => !n.groupId);
  }

  // Guarda la Nota seleccionada en una variable(notaPendiente), para luego poder guardarla en un Grupo, abre el selector de grupo, (*ngIf=mostrarSelectorGrupo=true)
  abrirSelectorGrupo(nota: Nota){
    this.notaPendiente = nota;
    this.mostrarSelectorGrupo = true;
  }

  // Toma el id del grupo seleccionado y se le asigna a la nota en pendiente, al abrir el selector de grupo que aparece cuando presionamos en (save)
  asignarNotaAGrupo(grupoId: number | null){

    if (this.notaPendiente && typeof this.notaPendiente.id === 'number'){ // verifica si this.notaPendiente.id === sea tipo "number"
      
      this.notasServicio.updateNota({

        id: this.notaPendiente.id,
        title: this.notaPendiente.title,
        content: this.notaPendiente.content,
        groupId: grupoId ?? undefined // Si el valor ES null o undefined, se asigna undefined, sino, se assigna el grupoId
      });
    }

    // Resetea todo
    this.resetForm();
  }

  // Oculta el selector grupo, y deja la nota seleccionada a null (*ngIf=mostrarSelectorGrupo=false)
  cancelarSelectorGrupo(){
    this.mostrarSelectorGrupo = false;
    this.notaPendiente = null;
  }
 
  //Limpia todo lo relacionado con el contenido de una nota
  resetForm() {
    this.mostrarSelectorGrupo = false;
    this.notaPendiente = null;
    this.TituloNota = '';
    this.ContenidoNota = '';
    this.editarNotaId = null;
  }

  //Selecciona una nota, la nota, el contenido de la nota, se mostrara, pero no se podra editar
  seleccionarNota(nota: Nota){
    this.notaSeleccionada = nota;
  }

  cerrarNotaSeleccionada(){
    this.notaSeleccionada = null;
  }

  // Llama a la funcion del servicio para limpiar(borrar) las notas
  limpiarNotas() {
    this.notasServicio.clearNotas();
  }
}
