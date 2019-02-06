import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlateComponent } from './slate.component';

describe('SlateComponent', () => {
  let component: SlateComponent;
  let fixture: ComponentFixture<SlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
