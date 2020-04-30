import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringdisplayComponent } from './wateringdisplay.component';

describe('WateringdisplayComponent', () => {
  let component: WateringdisplayComponent;
  let fixture: ComponentFixture<WateringdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WateringdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WateringdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
