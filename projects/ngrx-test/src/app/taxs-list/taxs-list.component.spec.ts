import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsListComponent } from './taxs-list.component';

describe('TaxsListComponent', () => {
  let component: TaxsListComponent;
  let fixture: ComponentFixture<TaxsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxsListComponent]
    });
    fixture = TestBed.createComponent(TaxsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
