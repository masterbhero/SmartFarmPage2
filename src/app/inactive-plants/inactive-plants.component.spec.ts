import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivePlantsComponent } from './inactive-plants.component';

describe('InactivePlantsComponent', () => {
  let component: InactivePlantsComponent;
  let fixture: ComponentFixture<InactivePlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivePlantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivePlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
