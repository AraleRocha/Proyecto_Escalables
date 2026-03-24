import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionTableComponent } from './adoption-table-component';

describe('AdoptionTableComponent', () => {
  let component: AdoptionTableComponent;
  let fixture: ComponentFixture<AdoptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
