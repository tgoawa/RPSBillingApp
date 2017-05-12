import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ClientSearchService } from './services/client-search.service';

import { Client } from '../client';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {
  searchById = true;
  clients: Observable<Client[]>;
  clientIdSearch: FormGroup;
  clientNameSearch: FormGroup;

  constructor(private fb: FormBuilder, private clientSearchService: ClientSearchService) { }

  ngOnInit() {

  }

  getClients() {
    this.clients = this.clientSearchService.clients;
    if (this.clients.toArray.length < 1) {
      this.clientSearchService.getClients();
    }
  }

  idSearchForm() {
    this.clientIdSearch = this.fb.group({
      ClientName: ['', Validators.required]
    });
  }

  nameSearchForm() {
    this.clientNameSearch = this.fb.group({
      ClientName: ['', Validators.required]
    });
  }

  toggleSearchType() {
    this.searchById = !this.searchById;
  }

  onSubmitIdSearch(value) {
    
  }

  onSubmitNameSearch(value)
 {

 }}
