import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceEntryComponent } from './maintenance-entry.component';

describe('MaintenanceEntryComponent', () => {
  let component: MaintenanceEntryComponent;
  let fixture: ComponentFixture<MaintenanceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
