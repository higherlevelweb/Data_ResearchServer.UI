import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationCalculatorComponent } from './accomodation-calculator.component';

describe('AccomodationCalculatorComponent', () => {
  let component: AccomodationCalculatorComponent;
  let fixture: ComponentFixture<AccomodationCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
