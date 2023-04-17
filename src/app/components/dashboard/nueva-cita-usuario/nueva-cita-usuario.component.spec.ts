import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCitaUsuarioComponent } from './nueva-cita-usuario.component';

describe('NuevaCitaUsuarioComponent', () => {
  let component: NuevaCitaUsuarioComponent;
  let fixture: ComponentFixture<NuevaCitaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCitaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCitaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
