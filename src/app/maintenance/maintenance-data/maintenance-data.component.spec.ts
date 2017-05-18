import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDataComponent } from './maintenance-data.component';

describe('MaintenanceDataComponent', () => {
  let component: MaintenanceDataComponent;
  let fixture: ComponentFixture<MaintenanceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
