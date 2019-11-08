import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSubNavAnalyzeComponent } from './site-sub-nav-analyze.component';

describe('SiteSubNavComponent', () => {
  let component: SiteSubNavAnalyzeComponent;
  let fixture: ComponentFixture<SiteSubNavAnalyzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSubNavAnalyzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSubNavAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
