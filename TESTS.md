# Documentación de Pruebas Unitarias (Unit Tests Documentation)

## Resumen (Summary)

Este documento describe las pruebas unitarias creadas para la aplicación QikNotesApp.

This document describes the unit tests created for the QikNotesApp application.

## Cobertura de Pruebas (Test Coverage)

### Total: 54 pruebas unitarias (54 unit tests)

## Archivos de Prueba Creados/Mejorados (Test Files Created/Enhanced)

### 1. AppComponent Tests (`src/app/app.component.spec.ts`) - 5 tests
- ✓ Verificación de creación del componente
- ✓ Inicialización con grupoSeleccionadoId en null
- ✓ Inicialización con grupoSeleccionadoNombre en null
- ✓ Selección de grupo funciona correctamente
- ✓ Función volverAVistaPrincipal resetea valores correctamente

### 2. NotasServicio Tests (`src/app/servicio/servicio.spec.ts`) - 17 tests
**Nuevo archivo creado** - Pruebas completas para el servicio principal

#### Operaciones de Grupo (Group Operations)
- ✓ Agregar un grupo
- ✓ Agregar múltiples grupos
- ✓ Eliminar un grupo
- ✓ Eliminar grupo y sus notas asociadas

#### Operaciones de Nota (Note Operations)
- ✓ Agregar nota sin groupId
- ✓ Agregar nota con groupId
- ✓ Actualizar una nota
- ✓ Eliminar una nota
- ✓ Limpiar notas de un grupo específico
- ✓ Limpiar notas sin grupo

#### Comportamiento Observable (Observable Behavior)
- ✓ Emisión inicial de array vacío para notas$
- ✓ Emisión inicial de array vacío para grupos$

### 3. NotasComponent Tests (`src/app/vista/notas/notas.component.spec.ts`) - 21 tests
**Archivo mejorado** - Pruebas completas para el componente de notas

#### Inicialización (Initialization)
- ✓ Creación del componente
- ✓ Campos de formulario vacíos al inicio
- ✓ Array de notas vacío al inicio
- ✓ mostrarSelectorGrupo en false al inicio

#### Funcionalidad de Agregar Notas (Add Note Functionality)
- ✓ Agregar nota con datos válidos
- ✓ Limpiar formulario después de agregar nota
- ✓ No agregar nota cuando título está vacío
- ✓ No agregar nota cuando contenido está vacío

#### Funcionalidad de Editar/Actualizar (Edit/Update Functionality)
- ✓ Eliminar nota
- ✓ Editar nota (poblar formulario)
- ✓ Cancelar edición
- ✓ Guardar nota editada

#### Filtrado y Selección (Filtering and Selection)
- ✓ Filtrar notas sin groupId
- ✓ Abrir selector de grupo
- ✓ Asignar nota a grupo
- ✓ Cancelar selector de grupo
- ✓ Resetear formulario
- ✓ Seleccionar nota
- ✓ Cerrar nota seleccionada
- ✓ Limpiar notas

### 4. GruposComponent Tests (`src/app/vista/grupos/grupos.component.spec.ts`) - 7 tests
**Archivo mejorado** - Pruebas completas para el componente de grupos

- ✓ Creación del componente
- ✓ Array de grupos vacío al inicio
- ✓ Crear grupo con nombre válido
- ✓ No agregar grupo cuando prompt es cancelado
- ✓ Mostrar alerta cuando nombre excede caracteres máximos
- ✓ Eliminar grupo
- ✓ Emitir evento grupoSeleccionado
- ✓ Actualizar grupos cuando servicio emite cambios

### 5. VistaGrupoComponent Tests (`src/app/vista/vista-grupo/vista-grupo.component.spec.ts`) - 8 tests
**Archivo mejorado** - Pruebas completas para el componente de vista de grupo

- ✓ Creación del componente
- ✓ Inicialización con grupoId y grupoNombre en null
- ✓ Array notasGrupo vacío al inicio
- ✓ Filtrar notas por grupoId en ngOnInit
- ✓ Limpiar notas de grupo específico
- ✓ No limpiar notas cuando grupoId es null
- ✓ Eliminar nota
- ✓ Emitir evento volver

## Cómo Ejecutar las Pruebas (How to Run Tests)

### Ejecutar todas las pruebas (Run all tests)
```bash
npm test
```

### Ejecutar pruebas en modo headless (Run tests in headless mode)
```bash
npm test -- --no-watch --browsers=ChromeHeadless
```

### Ejecutar pruebas en modo watch (Run tests in watch mode)
```bash
npm test -- --watch
```

## Framework de Pruebas (Testing Framework)

- **Framework**: Jasmine
- **Test Runner**: Karma
- **Browser**: ChromeHeadless (para CI/CD)

## Resultados (Results)

✅ **54 de 54 pruebas pasando exitosamente (54 of 54 tests passing successfully)**

## Seguridad (Security)

✅ **CodeQL Analysis**: Sin vulnerabilidades detectadas (No vulnerabilities detected)

## Fecha de Creación (Creation Date)

21 de Octubre, 2025
