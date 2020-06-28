import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlotComponent } from './admin-plot.component';

describe('AdminPlotComponent', () => {
  let component: AdminPlotComponent;
  let fixture: ComponentFixture<AdminPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
