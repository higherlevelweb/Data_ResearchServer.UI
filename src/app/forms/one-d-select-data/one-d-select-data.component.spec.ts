import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDSelectDataComponent } from './one-d-select-data.component';

describe('OneDSelectDataComponent', () => {
  let component: OneDSelectDataComponent;
  let fixture: ComponentFixture<OneDSelectDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneDSelectDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDSelectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
