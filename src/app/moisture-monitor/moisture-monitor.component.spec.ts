import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistureMonitorComponent } from './moisture-monitor.component';

describe('MoistureMonitorComponent', () => {
  let component: MoistureMonitorComponent;
  let fixture: ComponentFixture<MoistureMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistureMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistureMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
