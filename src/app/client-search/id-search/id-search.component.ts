import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ClientSearchService } from '../services/client-search.service';

import { Client } from '../../client';

@Component({
  selector: 'app-id-search',
  templateUrl: './id-search.component.html',
  styleUrls: ['./id-search.component.css']
})
export class IdSearchComponent implements OnInit {
  clientIdSearch: FormGroup;
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
    this.clientIdSearch = this.fb.group({
      ClientId: ['', Validators.required]
    });
  }

  onSubmit(formValue) {
    // get client data
  }

}
