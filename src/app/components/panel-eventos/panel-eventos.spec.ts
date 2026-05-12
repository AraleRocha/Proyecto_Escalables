import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEventos } from './panel-eventos';

describe('PanelEventos', () => {
  let component: PanelEventos;
  let fixture: ComponentFixture<PanelEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
