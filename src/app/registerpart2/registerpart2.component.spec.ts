import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registerpart2Component } from './registerpart2.component';

describe('Registerpart2Component', () => {
  let component: Registerpart2Component;
  let fixture: ComponentFixture<Registerpart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registerpart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registerpart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
