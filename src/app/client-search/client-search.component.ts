import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ClientSearchService } from './services/client-search.service';

import { Client } from '../client';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {
  @Input() formIsDirty: boolean;
  @Output() rpsBillClient: EventEmitter<Client> = new EventEmitter<Client>();
  @ViewChild('auto') auto: ElementRef;
  confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  clients: Client[];
  clientListControl: FormControl = new FormControl();
  filteredClients: Observable<Client[]>;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
  private clientSearchService: ClientSearchService,
  private dialog: MatDialog) { }

  ngOnInit() {
    this.getClients();
  }

  clear() {
    this.clientListControl.setValue('');
    this.rpsBillClient.emit(this.clientListControl.value);
    this.formIsDirty = false;
  }

  onClearClient() {
    if (this.formIsDirty) {
      this.openConfirmationDialog();
    } else {
      this.clear();
    }
  };

  displayName(client: Client) {
    return client ? client.ClientName : client;
  }

  getClientInvoice() {
    this.rpsBillClient.emit(this.clientListControl.value);
  }

  private getClients() {
      this.isLoading = true;
      this.clientSearchService.getClients()
      .subscribe(data => {
          this.clients = data;
          this.addIdToName(this.clients);
          this.setClientAutoComplete();
          this.isLoading = false;
      },
      error => {
        console.log(error);
      });
    }

    private addIdToName(data: Client[]) {
      for (let x = 0; x < data.length; x++) {
        data[x].ClientName = data[x].ClientId + ' - ' + data[x].ClientName;
      }
    }

    private filterClients(name: string): Client[] {
      return this.clients.filter(client =>
        client.ClientName.toLowerCase().includes(name.toLowerCase()));
    }

    private openConfirmationDialog() {
      this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent);

      this.confirmationDialogRef.afterClosed().subscribe(ignoreChanges => {
        if (ignoreChanges) {
          this.clear();
        }
      })
    }

    private setClientAutoComplete() {
      this.filteredClients = this.clientListControl.valueChanges
      .map(client => client && typeof client === 'object' ? client.ClientName : client)
      .map(val => {
          if (val.length > 2) {
            return this.filterClients(val);
          } else {
            return;
          }
        });
    }
  }
