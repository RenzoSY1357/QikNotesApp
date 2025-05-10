/*
La interfaz es para describir como un objeto Nota y grupo se deben ver,
con la interfaz se asegura que los objetos nota o grupo, tienen las correctas propietadades y tipos,
ayuda a prevenir errores.
*/

export interface Nota { //Con export, puedo usar la interface en otros archivos
    id: number;
    title: string;
    content: string;
    groupId?: number; // propiedad opcional
}

export interface Grupo {
    id: number;
    name: string;
}
