import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAGameComponent } from './start-agame.component';

describe('StartAGameComponent', () => {
  let component: StartAGameComponent;
  let fixture: ComponentFixture<StartAGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartAGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
