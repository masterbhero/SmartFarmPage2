import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotMenuComponent } from './plot-menu.component';

describe('PlotMenuComponent', () => {
  let component: PlotMenuComponent;
  let fixture: ComponentFixture<PlotMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
