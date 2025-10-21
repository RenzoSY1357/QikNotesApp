import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposComponent } from './grupos.component';
import { NotasServicio } from '../../servicio/servicio';
import { Grupo } from '../../modelo/modelo';

describe('GruposComponent', () => {
  let component: GruposComponent;
  let fixture: ComponentFixture<GruposComponent>;
  let notasServicio: NotasServicio;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposComponent);
    component = fixture.componentInstance;
    notasServicio = TestBed.inject(NotasServicio);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty grupos array', () => {
    expect(component.grupos).toEqual([]);
  });

  it('should call notasServicio.addGrupo when crearGrupo is called with valid name', () => {
    spyOn(window, 'prompt').and.returnValue('Test Group');
    spyOn(notasServicio, 'addGrupo');
    
    component.crearGrupo();
    
    expect(notasServicio.addGrupo).toHaveBeenCalledWith('Test Group');
  });

  it('should not add grupo when prompt is cancelled', () => {
    spyOn(window, 'prompt').and.returnValue(null);
    spyOn(notasServicio, 'addGrupo');
    
    component.crearGrupo();
    
    expect(notasServicio.addGrupo).not.toHaveBeenCalled();
  });

  it('should show alert when grupo name exceeds maximum characters', () => {
    const longName = 'a'.repeat(16);
    spyOn(window, 'prompt').and.returnValues(longName, 'Valid');
    spyOn(window, 'alert');
    spyOn(notasServicio, 'addGrupo');
    
    component.crearGrupo();
    
    expect(window.alert).toHaveBeenCalledWith('El nombre del grupo no puede exceder de 15 caracteres.');
    expect(notasServicio.addGrupo).toHaveBeenCalledWith('Valid');
  });

  it('should delete grupo when eliminarGrupo is called', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');
    spyOn(notasServicio, 'deleteGroup');
    
    component.eliminarGrupo(123, event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(notasServicio.deleteGroup).toHaveBeenCalledWith(123);
  });

  it('should emit grupoSeleccionado event when seleccionarGrupo is called', () => {
    const grupo: Grupo = { id: 123, name: 'Test Group' };
    spyOn(component.grupoSeleccionado, 'emit');
    
    component.seleccionarGrupo(grupo);
    
    expect(component.grupoSeleccionado.emit).toHaveBeenCalledWith({
      id: 123,
      name: 'Test Group'
    });
  });

  it('should update grupos when service emits new grupos', (done) => {
    notasServicio.addGrupo('New Group');
    
    setTimeout(() => {
      expect(component.grupos.length).toBeGreaterThan(0);
      expect(component.grupos[0].name).toBe('New Group');
      done();
    }, 100);
  });
});
