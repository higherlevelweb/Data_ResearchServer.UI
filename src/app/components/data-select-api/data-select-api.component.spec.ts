import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSelectApiComponent } from './data-select-api.component';

describe('DataApiComponent', () => {
  let component: DataSelectApiComponent;
  let fixture: ComponentFixture<DataSelectApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSelectApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSelectApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
