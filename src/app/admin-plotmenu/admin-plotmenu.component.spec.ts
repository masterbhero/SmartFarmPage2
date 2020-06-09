import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlotmenuComponent } from './admin-plotmenu.component';

describe('AdminPlotmenuComponent', () => {
  let component: AdminPlotmenuComponent;
  let fixture: ComponentFixture<AdminPlotmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlotmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlotmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
