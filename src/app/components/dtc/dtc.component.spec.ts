import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtcComponent } from './dtc.component';

describe('DtcComponent', () => {
  let component: DtcComponent;
  let fixture: ComponentFixture<DtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
