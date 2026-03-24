import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDetail } from './cat-detail';

describe('CatDetail', () => {
  let component: CatDetail;
  let fixture: ComponentFixture<CatDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
