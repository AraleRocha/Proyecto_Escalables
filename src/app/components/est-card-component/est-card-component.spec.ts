import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstCardComponent } from './est-card-component';

describe('EstCardComponent', () => {
  let component: EstCardComponent;
  let fixture: ComponentFixture<EstCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
