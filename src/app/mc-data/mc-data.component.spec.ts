import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McDataComponent } from './mc-data.component';

describe('McDataComponent', () => {
  let component: McDataComponent;
  let fixture: ComponentFixture<McDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
