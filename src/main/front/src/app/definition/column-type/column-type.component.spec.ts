import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTypeComponent } from './column-type.component';

describe('ColumnTypeComponent', () => {
  let component: ColumnTypeComponent;
  let fixture: ComponentFixture<ColumnTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
