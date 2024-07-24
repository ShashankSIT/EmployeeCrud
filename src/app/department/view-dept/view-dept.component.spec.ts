import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeptComponent } from './view-dept.component';

describe('ViewDeptComponent', () => {
  let component: ViewDeptComponent;
  let fixture: ComponentFixture<ViewDeptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDeptComponent]
    });
    fixture = TestBed.createComponent(ViewDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
