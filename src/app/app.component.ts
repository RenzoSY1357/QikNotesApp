import { Component } from '@angular/core';
// me permite definir los componentes
import { RouterOutlet } from '@angular/router';
// router: 'enrutador', aun no lo usamos??

import { GruposComponent } from "./vista/grupos/grupos.component";
import { NotasComponent } from "./vista/notas/notas.component"; // <-- Add this import
//importamos los componentes

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GruposComponent, NotasComponent],
  // esto registra los componentes importados, para que se puedan usar dentro de este componente
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  data = {
    title: 'QikNotesApp',
  };

}
