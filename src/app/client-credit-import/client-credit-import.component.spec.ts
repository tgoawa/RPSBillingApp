import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreditImportComponent } from './client-credit-import.component';

describe('ClientCreditImportComponent', () => {
  let component: ClientCreditImportComponent;
  let fixture: ComponentFixture<ClientCreditImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCreditImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreditImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
