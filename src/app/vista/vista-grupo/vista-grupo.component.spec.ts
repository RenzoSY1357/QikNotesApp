import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGrupoComponent } from './vista-grupo.component';

describe('VistaGrupoComponent', () => {
  let component: VistaGrupoComponent;
  let fixture: ComponentFixture<VistaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
