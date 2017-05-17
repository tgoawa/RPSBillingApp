import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPSDataComponent } from './rps-data.component';

describe('InvoiceEntryComponent', () => {
  let component: RPSDataComponent;
  let fixture: ComponentFixture<RPSDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPSDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPSDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
