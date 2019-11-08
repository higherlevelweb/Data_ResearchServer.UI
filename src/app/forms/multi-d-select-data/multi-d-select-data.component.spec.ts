import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDSelectDataComponent } from './multi-d-select-data.component';

describe('MultiDSelectComponent', () => {
  let component: MultiDSelectDataComponent;
  let fixture: ComponentFixture<MultiDSelectDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDSelectDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDSelectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
