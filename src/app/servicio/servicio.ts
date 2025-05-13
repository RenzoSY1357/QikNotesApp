import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// BehaviorSubject es un tipo especial llamado RxJS(Reactive EXtension para Javascript)
// la libreria reactive facilita el trabajo con flujo de datos asincronos, usando "BehaviourSubject"

// con $ conviertes al valor en observable, significa que se ira actualizando a los cambios

import { Nota, Grupo } from '../modelo/modelo';

/*
Este servicio tiene y administra todas las notas, grupos, etc. Los componentes, se encargan de usar esos datos de acuerdo a lo que necesiten.
*/

// decorador injectable, marca la clase como servicio, que puede ser injectado en los componentes
// Cuando se dice que una clase puede ser "injectable" en los componentes, significa que Angular puede crear una instancia de esa clase (servicio), a cualquier componente, directiva u otro servicio que la necesite
@Injectable({ providedIn: 'root' }) // esto significa que Angular creara solo una instancia por la aplicacion entera
export class NotasServicio {

    // creamos unas propiedades llamadas nota y grupo que sea un array de la interface Nota, para guardar las notas y grupos en memoria
    private notas: Nota[] = [];
    private grupos: Grupo[] = [];

    // BehaviorSubject significa que los componentes suscritos, pueden actualizar sus valores desde el servicio y tambien puede modificarlos, en este caso el Array de notas
    private notasSubject = new BehaviorSubject<Nota[]>([]); // Guarda un array de Nota, "([])", esto es para indicar que el array emitido esta vacio en principio
    notas$ = this.notasSubject.asObservable();
    // notas$ se vuelve una instancia de BehaviorSubject (this.notasSubject), pero lo vuelve un observable normal (Un tipo de BehaviorSubject), para que solo se pueda emitir los valores del servicio, pero no modificarlos
    // Es como la version de solo lectura de notasSubject, los componentes lo usan solo para recibir las actualizaciones

    private gruposSubject = new BehaviorSubject<Grupo[]>([]);
    grupos$ = this.gruposSubject.asObservable();

    // Ingresamos el nombre del grupo, el servicio genera un id, y subimos el objeto grupo al array
    addGrupo(name: string) {

        const grupo: Grupo = { id: Date.now(), name };

        this.grupos.push(grupo);
        this.gruposSubject.next(this.grupos);
        // gruposSubject envia los ultimos valores del array de grupos a todas las partes de la app que estan suscritas al mismo
    }

    // Pasamos el id del grupo por parametro y luego lo actualizamos, excluyendo(borrando) el grupo y sus notas del array de grupos/notas
    deleteGroup(id:number){

        this.grupos = this.grupos.filter(g => g.id !== id);
        this.notas = this.notas.filter( n => n.groupId !== id);

        this.gruposSubject.next(this.grupos);
        this.notasSubject.next(this.notas);
    }

    // Crea una nota usando las promiedades de Nota, exceptuando su id, cual id se genera a partir de la fecha actual
    // Cuando el usuario crea una nota, el objeto creado pasa a traves de este metodo omitiendo su id (Ya que al crearla, no lo solicita), el id es creado automaticamente por el sistema con un identificador unico
    addNota(nota: Omit<Nota, 'id'>) {

        const newNote: Nota = { ...nota, id: Date.now() };

        this.notas.push(newNote);
        this.notasSubject.next(this.notas);
    }

    // Actualiza la nota cambiandola de lugar con map, iterando con el id de la nota, si la nota existe la cambia por la nueva, si no se queda con la vieja
    updateNota(nota: Nota) {
        this.notas = this.notas.map( n => n.id === nota.id ? nota:n);
        this.notasSubject.next(this.notas);
    }

    // Delete notas, lo que hace es filtrar y actualizar el array de notas con las notas que no sean del id ingresado
    // Excluye la nota del array, basicamente
    deleteNota(id:number){
        this.notas = this.notas.filter(n => n.id !==id);
        this.notasSubject.next(this.notas);
    }

    // Borra las notas, si se pasa un id de un grupo, excluye(borra) las notas de ese grupo en especifico
    // Si no se pasa nada, excluye(borra) todas las notas que no tienen grupo
    clearNotas(groupId?: number){

        if (groupId) {
            this.notas = this.notas.filter( n => n.groupId !== groupId);
        } else {
            this.notas = this.notas.filter( n => n.groupId !== undefined);
        }
        this.notasSubject.next(this.notas);
    }

}