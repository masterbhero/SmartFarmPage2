import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlotconfigComponent } from './admin-plotconfig.component';

describe('AdminPlotconfigComponent', () => {
  let component: AdminPlotconfigComponent;
  let fixture: ComponentFixture<AdminPlotconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlotconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlotconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
