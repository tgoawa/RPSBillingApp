import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdSearchComponent } from './id-search.component';

describe('IdSearchComponent', () => {
  let component: IdSearchComponent;
  let fixture: ComponentFixture<IdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
