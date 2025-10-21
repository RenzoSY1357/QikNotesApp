import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasComponent } from './notas.component';
import { NotasServicio } from '../../servicio/servicio';
import { Nota } from '../../modelo/modelo';

describe('NotasComponent', () => {
  let component: NotasComponent;
  let fixture: ComponentFixture<NotasComponent>;
  let notasServicio: NotasServicio;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasComponent);
    component = fixture.componentInstance;
    notasServicio = TestBed.inject(NotasServicio);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form fields', () => {
    expect(component.TituloNota).toBe('');
    expect(component.ContenidoNota).toBe('');
    expect(component.editarNotaId).toBeNull();
  });

  it('should initialize with empty notas array', () => {
    expect(component.notas).toEqual([]);
  });

  it('should initialize with mostrarSelectorGrupo as false', () => {
    expect(component.mostrarSelectorGrupo).toBe(false);
  });

  it('should add a nota when addNota is called with valid data', () => {
    component.TituloNota = 'Test Title';
    component.ContenidoNota = 'Test Content';
    
    spyOn(notasServicio, 'addNota');
    component.addNota();
    
    expect(notasServicio.addNota).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content',
      groupId: undefined
    });
  });

  it('should clear form after adding a nota', () => {
    component.TituloNota = 'Test Title';
    component.ContenidoNota = 'Test Content';
    
    component.addNota();
    
    expect(component.TituloNota).toBe('');
    expect(component.ContenidoNota).toBe('');
  });

  it('should not add nota when title is empty', () => {
    component.TituloNota = '';
    component.ContenidoNota = 'Test Content';
    
    spyOn(notasServicio, 'addNota');
    component.addNota();
    
    expect(notasServicio.addNota).not.toHaveBeenCalled();
  });

  it('should not add nota when content is empty', () => {
    component.TituloNota = 'Test Title';
    component.ContenidoNota = '';
    
    spyOn(notasServicio, 'addNota');
    component.addNota();
    
    expect(notasServicio.addNota).not.toHaveBeenCalled();
  });

  it('should delete nota when eliminarNota is called', () => {
    spyOn(notasServicio, 'deleteNota');
    component.eliminarNota(123);
    
    expect(notasServicio.deleteNota).toHaveBeenCalledWith(123);
  });

  it('should populate form when editarNota is called', () => {
    const nota: Nota = {
      id: 123,
      title: 'Edit Test',
      content: 'Edit Content',
      groupId: undefined
    };
    
    component.editarNota(nota);
    
    expect(component.editarNotaId).toBe(123);
    expect(component.TituloNota).toBe('Edit Test');
    expect(component.ContenidoNota).toBe('Edit Content');
  });

  it('should clear form when cancelarEdicion is called', () => {
    component.editarNotaId = 123;
    component.TituloNota = 'Test';
    component.ContenidoNota = 'Content';
    
    component.cancelarEdicion();
    
    expect(component.editarNotaId).toBeNull();
    expect(component.TituloNota).toBe('');
    expect(component.ContenidoNota).toBe('');
  });

  it('should update nota when guardarNota is called', () => {
    component.TituloNota = 'Updated Title';
    component.ContenidoNota = 'Updated Content';
    
    spyOn(notasServicio, 'updateNota');
    component.guardarNota(123);
    
    expect(notasServicio.updateNota).toHaveBeenCalledWith({
      id: 123,
      title: 'Updated Title',
      content: 'Updated Content',
      groupId: undefined
    });
  });

  it('should filter notas without groupId', () => {
    component.notas = [
      { id: 1, title: 'Note 1', content: 'Content 1', groupId: undefined },
      { id: 2, title: 'Note 2', content: 'Content 2', groupId: 123 },
      { id: 3, title: 'Note 3', content: 'Content 3', groupId: undefined }
    ];
    
    const filtradas = component.notasFiltradas;
    
    expect(filtradas.length).toBe(2);
    expect(filtradas[0].id).toBe(1);
    expect(filtradas[1].id).toBe(3);
  });

  it('should open selector grupo when abrirSelectorGrupo is called', () => {
    const nota: Nota = { id: 123, title: 'Test', content: 'Content' };
    
    component.abrirSelectorGrupo(nota);
    
    expect(component.notaPendiente).toEqual(nota);
    expect(component.mostrarSelectorGrupo).toBe(true);
  });

  it('should assign nota to grupo when asignarNotaAGrupo is called', () => {
    component.notaPendiente = { id: 123, title: 'Test', content: 'Content' };
    
    spyOn(notasServicio, 'updateNota');
    component.asignarNotaAGrupo(456);
    
    expect(notasServicio.updateNota).toHaveBeenCalledWith({
      id: 123,
      title: 'Test',
      content: 'Content',
      groupId: 456
    });
  });

  it('should cancel selector grupo when cancelarSelectorGrupo is called', () => {
    component.mostrarSelectorGrupo = true;
    component.notaPendiente = { id: 123, title: 'Test', content: 'Content' };
    
    component.cancelarSelectorGrupo();
    
    expect(component.mostrarSelectorGrupo).toBe(false);
    expect(component.notaPendiente).toBeNull();
  });

  it('should reset form when resetForm is called', () => {
    component.mostrarSelectorGrupo = true;
    component.notaPendiente = { id: 123, title: 'Test', content: 'Content' };
    component.TituloNota = 'Title';
    component.ContenidoNota = 'Content';
    component.editarNotaId = 123;
    
    component.resetForm();
    
    expect(component.mostrarSelectorGrupo).toBe(false);
    expect(component.notaPendiente).toBeNull();
    expect(component.TituloNota).toBe('');
    expect(component.ContenidoNota).toBe('');
    expect(component.editarNotaId).toBeNull();
  });

  it('should select nota when seleccionarNota is called', () => {
    const nota: Nota = { id: 123, title: 'Test', content: 'Content' };
    
    component.seleccionarNota(nota);
    
    expect(component.notaSeleccionada).toEqual(nota);
  });

  it('should close selected nota when cerrarNotaSeleccionada is called', () => {
    component.notaSeleccionada = { id: 123, title: 'Test', content: 'Content' };
    
    component.cerrarNotaSeleccionada();
    
    expect(component.notaSeleccionada).toBeNull();
  });

  it('should clear notas when limpiarNotas is called', () => {
    spyOn(notasServicio, 'clearNotas');
    
    component.limpiarNotas();
    
    expect(notasServicio.clearNotas).toHaveBeenCalled();
  });
});
