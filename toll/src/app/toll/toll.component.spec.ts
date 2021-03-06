import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollComponent } from './toll.component';

describe('TollComponent', () => {
  let component: TollComponent;
  let fixture: ComponentFixture<TollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
