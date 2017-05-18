import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { Observable } from 'rxjs/Observable';
import { ClientSearchService } from './services/client-search.service';

import { Client } from '../client';

const toastConfig: ToastConfig = { positionClass: 'toast-center-center',
                                    timeOut: 10000,
                                    closeButton: true };

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

  constructor(private fb: FormBuilder,
  private clientSearchService: ClientSearchService,
  private toastrService: ToastrService) { }

  ngOnInit() {
    this.getClients();
    this.idSearchForm();
    this.nameSearchForm();
  }

  getClients() {
    if (this.clients.length < 1) {
      this.clientSearchService.getClients()
      .subscribe(data => {
        console.log(data);
        if (data.IsSuccessful) {
          this.clients = data.data;
        }
      },
      error => {
        console.log(error);
        this.showFailedSearch();
      });
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
    this.clientIdSearch.reset();
  }

  onSubmitNameSearch(form: Client) {
    this.client = this.findClientByName(form.ClientName);
    this.rpsBillClient.emit(this.client);
    this.clientNameSearch.reset();
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

  showFailedSearch() {
    this.toastrService.error('Error finding client list. Please try refreshing page or contact help desk at Ext: 1187 if issue persists',
    'Error finding client list!',
    toastConfig);
  }

}
