import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with null grupoSeleccionadoId', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.grupoSeleccionadoId).toBeNull();
  });

  it('should initialize with null grupoSeleccionadoNombre', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.grupoSeleccionadoNombre).toBeNull();
  });

  it('should set grupoSeleccionadoId and grupoSeleccionadoNombre when GrupoSeleccionado is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const grupo = { id: 123, name: 'Test Group' };
    
    app.GrupoSeleccionado(grupo);
    
    expect(app.grupoSeleccionadoId).toBe(123);
    expect(app.grupoSeleccionadoNombre).toBe('Test Group');
  });

  it('should reset grupoSeleccionadoId and grupoSeleccionadoNombre when volverAVistaPrincipal is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // First set values
    app.grupoSeleccionadoId = 123;
    app.grupoSeleccionadoNombre = 'Test Group';
    
    // Then call volverAVistaPrincipal
    app.volverAVistaPrincipal();
    
    expect(app.grupoSeleccionadoId).toBeNull();
    expect(app.grupoSeleccionadoNombre).toBeNull();
  });
});
