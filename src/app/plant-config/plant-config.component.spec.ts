import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantConfigComponent } from './plant-config.component';

describe('PlantConfigComponent', () => {
  let component: PlantConfigComponent;
  let fixture: ComponentFixture<PlantConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
