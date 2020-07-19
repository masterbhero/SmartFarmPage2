import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotmenuStartComponent } from './plotmenu-start.component';

describe('PlotmenuStartComponent', () => {
  let component: PlotmenuStartComponent;
  let fixture: ComponentFixture<PlotmenuStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotmenuStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotmenuStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
