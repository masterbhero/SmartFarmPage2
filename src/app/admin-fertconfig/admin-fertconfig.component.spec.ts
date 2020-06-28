import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFertconfigComponent } from './admin-fertconfig.component';

describe('AdminFertconfigComponent', () => {
  let component: AdminFertconfigComponent;
  let fixture: ComponentFixture<AdminFertconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFertconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFertconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
