import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeviceComponent } from './addevice.component';

describe('AddeviceComponent', () => {
  let component: AddeviceComponent;
  let fixture: ComponentFixture<AddeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
