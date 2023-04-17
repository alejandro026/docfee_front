import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAntecedenteComponent } from './generar-antecedente.component';

describe('GenerarAntecedenteComponent', () => {
  let component: GenerarAntecedenteComponent;
  let fixture: ComponentFixture<GenerarAntecedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarAntecedenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarAntecedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
