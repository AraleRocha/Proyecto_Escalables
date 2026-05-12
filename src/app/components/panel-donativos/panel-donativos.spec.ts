import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDonativos } from './panel-donativos';

describe('PanelDonativos', () => {
  let component: PanelDonativos;
  let fixture: ComponentFixture<PanelDonativos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDonativos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDonativos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
