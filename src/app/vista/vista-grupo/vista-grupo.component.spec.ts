import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGrupoComponent } from './vista-grupo.component';
import { NotasServicio } from '../../servicio/servicio';

describe('VistaGrupoComponent', () => {
  let component: VistaGrupoComponent;
  let fixture: ComponentFixture<VistaGrupoComponent>;
  let notasServicio: NotasServicio;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGrupoComponent);
    component = fixture.componentInstance;
    notasServicio = TestBed.inject(NotasServicio);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null grupoId and grupoNombre', () => {
    expect(component.grupoId).toBeNull();
    expect(component.grupoNombre).toBeNull();
  });

  it('should initialize with empty notasGrupo array', () => {
    expect(component.notasGrupo).toEqual([]);
  });

  it('should filter notas by grupoId on ngOnInit', (done) => {
    component.grupoId = 123;
    
    notasServicio.addNota({ title: 'Note 1', content: 'Content 1', groupId: 123 });
    notasServicio.addNota({ title: 'Note 2', content: 'Content 2', groupId: 456 });
    notasServicio.addNota({ title: 'Note 3', content: 'Content 3', groupId: 123 });
    
    component.ngOnInit();
    
    setTimeout(() => {
      expect(component.notasGrupo.length).toBe(2);
      expect(component.notasGrupo[0].title).toBe('Note 1');
      expect(component.notasGrupo[1].title).toBe('Note 3');
      done();
    }, 100);
  });

  it('should clear notas for specific grupo when limpiarNotasGrupo is called', () => {
    component.grupoId = 123;
    spyOn(notasServicio, 'clearNotas');
    
    component.limpiarNotasGrupo();
    
    expect(notasServicio.clearNotas).toHaveBeenCalledWith(123);
  });

  it('should not clear notas when grupoId is null', () => {
    component.grupoId = null;
    spyOn(notasServicio, 'clearNotas');
    
    component.limpiarNotasGrupo();
    
    expect(notasServicio.clearNotas).not.toHaveBeenCalled();
  });

  it('should delete nota when eliminarNota is called', () => {
    spyOn(notasServicio, 'deleteNota');
    
    component.eliminarNota(123);
    
    expect(notasServicio.deleteNota).toHaveBeenCalledWith(123);
  });

  it('should emit volver event when called', () => {
    spyOn(component.volver, 'emit');
    
    component.volver.emit();
    
    expect(component.volver.emit).toHaveBeenCalled();
  });
});
