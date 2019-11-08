import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSubNavComponent } from './site-sub-nav.component';

describe('SiteSubNavComponent', () => {
  let component: SiteSubNavComponent;
  let fixture: ComponentFixture<SiteSubNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSubNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
