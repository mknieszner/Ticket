import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatsComponent } from './table-statistics.component';

describe('TableStatsComponent', () => {
  let component: TableStatsComponent;
  let fixture: ComponentFixture<TableStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
