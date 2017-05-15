import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpsFormComponent } from './rps-form.component';

describe('RpsFormComponent', () => {
  let component: RpsFormComponent;
  let fixture: ComponentFixture<RpsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
