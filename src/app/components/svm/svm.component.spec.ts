import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvmComponent } from './svm.component';

describe('SvmComponent', () => {
  let component: SvmComponent;
  let fixture: ComponentFixture<SvmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
