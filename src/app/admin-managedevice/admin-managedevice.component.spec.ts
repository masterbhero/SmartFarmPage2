import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagedeviceComponent } from './admin-managedevice.component';

describe('AdminManagedeviceComponent', () => {
  let component: AdminManagedeviceComponent;
  let fixture: ComponentFixture<AdminManagedeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagedeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
