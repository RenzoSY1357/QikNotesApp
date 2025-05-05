import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core'

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
  @Input() grupoId: number | null = null;
  @Input() grupoNombre: string | null = null;
  @Output() volver = new EventEmitter<void>();

  notasGrupo: Nota[] = [];

  constructor(private notasServicio: NotasServicio){}

  ngOnInit(){
    this.notasServicio.notas$.subscribe(notas => {
      this.notasGrupo = notas.filter( n => n.groupId === this.grupoId);
    });
  }

  limpiarNotasGrupo() {
    if (this.grupoId !== null){
      this.notasServicio.clearNotas(this.grupoId);
    }
  }
  
  eliminarNota(id: number){
    this.notasServicio.deleteNota(id);
  }
}
