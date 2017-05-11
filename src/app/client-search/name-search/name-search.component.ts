import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ClientSearchService } from '../services/client-search.service';

import { Client } from '../../client';

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.css']
})
export class NameSearchComponent implements OnInit {
  clientNameSearch: FormGroup;
  clients: Observable<Client[]>;

  constructor(private fb: FormBuilder, private clientSearchService: ClientSearchService) { }

  ngOnInit() {
    this.getClients();
    this.buildForm();
  }

  getClients() {
    this.clients = this.clientSearchService.clients;
    if (this.clients.toArray.length < 1) {
      this.clientSearchService.getClients();
    }
  }

  buildForm() {
    this.clientNameSearch = this.fb.group({
      ClientName: ['', Validators.required]
    });
  }

  onSubmit(formValue) {
    // get client data
  }

}
