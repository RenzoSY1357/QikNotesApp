import { TestBed } from '@angular/core/testing';
import { NotasServicio } from './servicio';
import { Nota, Grupo } from '../modelo/modelo';

describe('NotasServicio', () => {
  let service: NotasServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Grupo operations', () => {
    it('should add a grupo', (done) => {
      service.grupos$.subscribe(grupos => {
        if (grupos.length > 0) {
          expect(grupos.length).toBe(1);
          expect(grupos[0].name).toBe('Test Group');
          expect(grupos[0].id).toBeDefined();
          done();
        }
      });

      service.addGrupo('Test Group');
    });

    it('should add multiple grupos', (done) => {
      service.addGrupo('Group 1');
      service.addGrupo('Group 2');
      
      service.grupos$.subscribe(grupos => {
        if (grupos.length === 2) {
          expect(grupos.length).toBe(2);
          expect(grupos[0].name).toBe('Group 1');
          expect(grupos[1].name).toBe('Group 2');
          done();
        }
      });
    });

    it('should delete a grupo', (done) => {
      service.addGrupo('Group to Delete');
      
      let grupoId: number;
      service.grupos$.subscribe(grupos => {
        if (grupos.length === 1) {
          grupoId = grupos[0].id;
          service.deleteGroup(grupoId);
        } else if (grupos.length === 0) {
          expect(grupos.length).toBe(0);
          done();
        }
      });
    });

    it('should delete grupo and its associated notas', (done) => {
      service.addGrupo('Group with Notes');
      
      let grupoId: number;
      service.grupos$.subscribe(grupos => {
        if (grupos.length === 1) {
          grupoId = grupos[0].id;
          
          // Add notes to this group
          service.addNota({ title: 'Note 1', content: 'Content 1', groupId: grupoId });
          service.addNota({ title: 'Note 2', content: 'Content 2', groupId: grupoId });
          
          // Delete the group
          service.deleteGroup(grupoId);
        }
      });

      // Verify notes are also deleted
      service.notas$.subscribe(notas => {
        const notasDelGrupo = notas.filter(n => n.groupId === grupoId);
        if (grupoId && notasDelGrupo.length === 0) {
          expect(notasDelGrupo.length).toBe(0);
          done();
        }
      });
    });
  });

  describe('Nota operations', () => {
    it('should add a nota without groupId', (done) => {
      service.notas$.subscribe(notas => {
        if (notas.length > 0) {
          expect(notas.length).toBe(1);
          expect(notas[0].title).toBe('Test Note');
          expect(notas[0].content).toBe('Test Content');
          expect(notas[0].id).toBeDefined();
          expect(notas[0].groupId).toBeUndefined();
          done();
        }
      });

      service.addNota({ title: 'Test Note', content: 'Test Content' });
    });

    it('should add a nota with groupId', (done) => {
      const groupId = 123;
      
      service.notas$.subscribe(notas => {
        if (notas.length > 0) {
          expect(notas[0].groupId).toBe(groupId);
          done();
        }
      });

      service.addNota({ title: 'Test Note', content: 'Test Content', groupId: groupId });
    });

    it('should update a nota', (done) => {
      service.addNota({ title: 'Original Title', content: 'Original Content' });

      let notaId: number;
      let updateCalled = false;

      service.notas$.subscribe(notas => {
        if (notas.length === 1 && !updateCalled) {
          notaId = notas[0].id;
          updateCalled = true;
          
          const updatedNota: Nota = {
            id: notaId,
            title: 'Updated Title',
            content: 'Updated Content'
          };
          service.updateNota(updatedNota);
        } else if (notas.length === 1 && updateCalled) {
          expect(notas[0].title).toBe('Updated Title');
          expect(notas[0].content).toBe('Updated Content');
          done();
        }
      });
    });

    it('should delete a nota', (done) => {
      service.addNota({ title: 'Note to Delete', content: 'Content' });

      let notaId: number;
      service.notas$.subscribe(notas => {
        if (notas.length === 1) {
          notaId = notas[0].id;
          service.deleteNota(notaId);
        } else if (notas.length === 0) {
          expect(notas.length).toBe(0);
          done();
        }
      });
    });

    it('should clear notas for a specific group', (done) => {
      const groupId = 123;
      service.addNota({ title: 'Note 1', content: 'Content 1', groupId: groupId });
      service.addNota({ title: 'Note 2', content: 'Content 2', groupId: groupId });
      service.addNota({ title: 'Note 3', content: 'Content 3', groupId: 456 });

      let clearCalled = false;
      service.notas$.subscribe(notas => {
        if (notas.length === 3 && !clearCalled) {
          clearCalled = true;
          service.clearNotas(groupId);
        } else if (clearCalled && notas.length === 1) {
          expect(notas.length).toBe(1);
          expect(notas[0].groupId).toBe(456);
          done();
        }
      });
    });

    it('should clear notas without group when no groupId is provided', (done) => {
      service.addNota({ title: 'Note without group', content: 'Content' });
      service.addNota({ title: 'Note with group', content: 'Content', groupId: 123 });

      let clearCalled = false;
      service.notas$.subscribe(notas => {
        if (notas.length === 2 && !clearCalled) {
          clearCalled = true;
          service.clearNotas();
        } else if (clearCalled && notas.length === 1) {
          expect(notas.length).toBe(1);
          expect(notas[0].groupId).toBe(123);
          done();
        }
      });
    });
  });

  describe('Observable behavior', () => {
    it('should emit initial empty array for notas$', (done) => {
      service.notas$.subscribe(notas => {
        expect(notas).toEqual([]);
        done();
      });
    });

    it('should emit initial empty array for grupos$', (done) => {
      service.grupos$.subscribe(grupos => {
        expect(grupos).toEqual([]);
        done();
      });
    });
  });
});
