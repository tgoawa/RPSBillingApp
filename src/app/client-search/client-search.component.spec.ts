import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchComponent } from './client-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';
import { ClientSearchService } from 'app/client-search/services/client-search.service';
import { HttpModule } from '@angular/http';

describe('ClientSearchComponent', () => {
  let component: ClientSearchComponent;
  let fixture: ComponentFixture<ClientSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TypeaheadModule, HttpModule],
      declarations: [ ClientSearchComponent ],
      providers: [ClientSearchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create client id search form', () => {
    expect(component.idSearchForm).toBeTruthy();
  });

  it('should create client name search form', () => {
    expect(component.nameSearchForm).toBeTruthy();
  });

});
