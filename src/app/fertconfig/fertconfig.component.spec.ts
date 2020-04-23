import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FertconfigComponent } from './fertconfig.component';

describe('FertconfigComponent', () => {
  let component: FertconfigComponent;
  let fixture: ComponentFixture<FertconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FertconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FertconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
