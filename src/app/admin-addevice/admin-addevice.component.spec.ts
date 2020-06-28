import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddeviceComponent } from './admin-addevice.component';

describe('AdminAddeviceComponent', () => {
  let component: AdminAddeviceComponent;
  let fixture: ComponentFixture<AdminAddeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
