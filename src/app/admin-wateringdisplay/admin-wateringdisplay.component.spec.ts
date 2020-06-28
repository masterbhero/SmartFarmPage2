import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWateringdisplayComponent } from './admin-wateringdisplay.component';

describe('AdminWateringdisplayComponent', () => {
  let component: AdminWateringdisplayComponent;
  let fixture: ComponentFixture<AdminWateringdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWateringdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWateringdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
