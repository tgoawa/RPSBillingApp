import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() rpsBillClient: EventEmitter<Client> = new EventEmitter<Client>();

  client: Client;
  searchById = false;
  clients: Client[] = [];
  clientIdSearch: FormGroup;
  clientNameSearch: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private clientSearchService: ClientSearchService) { }

  ngOnInit() {
    this.getClients();
    this.idSearchForm();
    this.nameSearchForm();
  }

  getClients() {
    if (this.clients.length < 1) {
      this.clientSearchService.getClients()
      .subscribe(data => {
        this.clients = data;
      },
                  error => this.errorMessage = error);
    }
  }

  idSearchForm() {
    this.clientIdSearch = this.fb.group({
      ClientId: ['', Validators.required]
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

  onSubmitIdSearch(form: Client) {
    this.client = this.findClientById(form.ClientId);
    this.rpsBillClient.emit(this.client);
  }

  onSubmitNameSearch(form: Client) {
    this.client = this.findClientByName(form.ClientName);
    this.rpsBillClient.emit(this.client);
  }

  findClientByName(clientName: string): Client {
    for (let index = 0; index < this.clients.length; index++) {
      if (clientName === this.clients[index].ClientName) {
        return this.clients[index];
      }
    }
  }

  findClientById(clientId: number): Client {
    for (let index = 0; index < this.clients.length; index++) {
      if (+clientId === this.clients[index].ClientId) {
        return this.clients[index];
      }
    }
  }
}
