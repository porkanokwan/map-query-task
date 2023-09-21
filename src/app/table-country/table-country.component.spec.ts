import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCountryComponent } from './table-country.component';

describe('TableCountryComponent', () => {
  let component: TableCountryComponent;
  let fixture: ComponentFixture<TableCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCountryComponent]
    });
    fixture = TestBed.createComponent(TableCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
