import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDDataSelectApiComponent } from './multi-d-data-select-api.component';

describe('MultiDDataSelectApiComponent', () => {
  let component: MultiDDataSelectApiComponent;
  let fixture: ComponentFixture<MultiDDataSelectApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDDataSelectApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDDataSelectApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
