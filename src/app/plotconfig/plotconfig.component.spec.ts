import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotconfigComponent } from './plotconfig.component';

describe('PlotconfigComponent', () => {
  let component: PlotconfigComponent;
  let fixture: ComponentFixture<PlotconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
