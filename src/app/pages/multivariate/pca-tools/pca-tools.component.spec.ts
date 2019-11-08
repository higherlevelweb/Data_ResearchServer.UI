import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcaToolsComponent } from './pca-tools.component';

describe('PcaToolsComponent', () => {
  let component: PcaToolsComponent;
  let fixture: ComponentFixture<PcaToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcaToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcaToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
