import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGatos } from './panel-gatos';

describe('PanelGatos', () => {
  let component: PanelGatos;
  let fixture: ComponentFixture<PanelGatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelGatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelGatos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
