import { Component } from '@angular/core';
// me permite definir los componentes

import { CommonModule } from '@angular/common';

import { GruposComponent } from "./vista/grupos/grupos.component";
import { NotasComponent } from "./vista/notas/notas.component";
import { VistaGrupoComponent } from "./vista/vista-grupo/vista-grupo.component";
// importamos los componentes

@Component({
  selector: 'app-root',
  imports: [GruposComponent, NotasComponent, VistaGrupoComponent, CommonModule],
  // esto registra los componentes importados, para que se puedan usar dentro de este componente
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  grupoSeleccionadoId: number | null = null;
  grupoSeleccionadoNombre: string | null = null;

  // Se guardan los datos del grupo seleccionado, recibidos con [grupoSeleccionadId] y [grupoNombre]
  GrupoSeleccionado(grupo: { id: number, name: string }){
    this.grupoSeleccionadoId = grupo.id;
    this.grupoSeleccionadoNombre = grupo.name;
  }

  // Oculta los elementos de la vista grupo
  volverAVistaPrincipal(){
    this.grupoSeleccionadoId = null;
    this.grupoSeleccionadoNombre = null;
  }

}
