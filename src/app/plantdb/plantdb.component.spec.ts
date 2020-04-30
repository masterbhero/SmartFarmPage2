import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantdbComponent } from './plantdb.component';

describe('PlantdbComponent', () => {
  let component: PlantdbComponent;
  let fixture: ComponentFixture<PlantdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
