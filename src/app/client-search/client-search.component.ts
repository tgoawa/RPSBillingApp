import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClientSearchService } from './services/client-search.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {
  clientSearch: FormGroup;
  searchClientName: Boolean;

  constructor(private fb: FormBuilder, private clientSearchService: ClientSearchService) { }

  ngOnInit() {
    this.clientSearch = this.fb.group({
      ClientId: 0,
      ClientName: ''
    });
  }

}
