import { Component } from '@angular/core';
// me permite definir los componentes
import { RouterOutlet } from '@angular/router';
// router: 'enrutador', aun no lo usamos??
import { CommonModule } from '@angular/common';

import { GruposComponent } from "./vista/grupos/grupos.component";
import { NotasComponent } from "./vista/notas/notas.component";
import { VistaGrupoComponent } from "./vista/vista-grupo/vista-grupo.component";
//importamos los componentes

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GruposComponent, NotasComponent, VistaGrupoComponent, CommonModule],
  // esto registra los componentes importados, para que se puedan usar dentro de este componente
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  data = {
    title: 'QikNotesApp',
  };

  grupoSeleccionadoId: number | null = null;
  grupoSeleccionadoNombre: string | null = null;

  GrupoSeleccionado(grupo: { id: number, name: string }){
    this.grupoSeleccionadoId = grupo.id;
    this.grupoSeleccionadoNombre = grupo.name;
  }

  volverAVistaPrincipal(){
    this.grupoSeleccionadoId = null;
    this.grupoSeleccionadoNombre = null;
  }

}
