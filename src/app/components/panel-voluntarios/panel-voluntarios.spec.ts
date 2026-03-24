import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVoluntarios } from './panel-voluntarios';

describe('PanelVoluntarios', () => {
  let component: PanelVoluntarios;
  let fixture: ComponentFixture<PanelVoluntarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelVoluntarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelVoluntarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
