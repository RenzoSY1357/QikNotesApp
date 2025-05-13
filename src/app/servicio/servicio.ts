import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// BehaviorSubject es un tipo especial llamado RxJS(Reactive EXtension para Javascript)
// la libreria reactive facilita el trabajo con flujo de datos asincronos, usando "BehaviourSubject"

// con $ conviertes al valor en observable, significa que se ira actualizando a los cambios

import { Nota, Grupo } from '../modelo/modelo';


/*
Este servicio maneja las notas y agrupa los datos
*/

// decorador injectable, marca la clase como
@Injectable({ providedIn: 'root' }) // esto significa que Angular creara solo una instancia por la aplicacion entera
export class NotasServicio {

    private notas: Nota[] = []; // creamos una propiedad llamada nota que sea un array de la interface Nota, esta vacio, por ahora
    private notasSubject = new BehaviorSubject<Nota[]>([]); // Emite un array de Nota, "([])", esto es para indicar que el array emitido esta vacio
    // BehaviorSubject es un tipo especial de Observable cuyo valor puede ser actualizado

    notas$ = this.notasSubject.asObservable();
    // convertimos el BehaviorSubject en un observable normal, que significa que las notas no se pueden modificar directamente, solo a traves del servicio

    private grupos: Grupo[] = [];
    private gruposSubject = new BehaviorSubject<Grupo[]>([]);
    grupos$ = this.gruposSubject.asObservable();

    addGrupo(name: string) {
         // crea una variable grupo de tipo objeto grupo, el id, se genera de un numero unico basado en la fecha actual
        const grupo: Grupo = { id: Date.now(), name};
        this.grupos.push(grupo) // lo añade a al array
        this.gruposSubject.next(this.grupos);
        // gruposSubject envia los ultimos valores del array de grupos a todas las partes de la app que estan suscritas al mismo
    }

    deleteGroup(id:number){
        this.grupos = this.grupos.filter(g => g.id !== id); //Actualiza el array de grupos removiendo el grupo cuyo id sea igual
        this.notas = this.notas.filter( n => n.groupId !== id);
        this.gruposSubject.next(this.grupos);
        this.notasSubject.next(this.notas);
    }

    addNota(nota: Omit<Nota, 'id'>) { //Metodo addNota, que usa de parametro una Nota, pero omite su id
        const newNote: Nota = { ...nota, id: Date.now() };
        this.notas.push(newNote);
        this.notasSubject.next(this.notas);
    }

    updateNota(nota: Nota) {
        this.notas = this.notas.map( n => n.id === nota.id ? nota:n);
        this.notasSubject.next(this.notas);
    }

    deleteNota(id:number){
        this.notas = this.notas.filter(n => n.id !==id);
        this.notasSubject.next(this.notas);
    }

    clearNotas(groupId?: number){
        if (groupId) {
            this.notas = this.notas.filter( n => n.groupId !== groupId);
        } else {
            this.notas = this.notas.filter( n => n.groupId !== undefined);
        }
        this.notasSubject.next(this.notas);
    }

}