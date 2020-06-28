import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWateringComponent } from './admin-watering.component';

describe('AdminWateringComponent', () => {
  let component: AdminWateringComponent;
  let fixture: ComponentFixture<AdminWateringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWateringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWateringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
