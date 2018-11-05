import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Client } from '../client';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../core/confirmation-dialog/confirmation-dialog.component';
import { ClientSearchService } from '../core/services/client-search.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSearchComponent implements OnInit, OnChanges {
  @Input() clients: Client[];
  @Output() rpsBillClient: EventEmitter<Client> = new EventEmitter<Client>();
  @ViewChild('auto') auto: ElementRef;
  confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  clientListControl: FormControl = new FormControl();
  isFormDirty: boolean;
  filteredClients: Observable<Client[]>;

  constructor(
    private fb: FormBuilder,
    private clientSearchService: ClientSearchService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.clientSearchService.isFormDirty$.subscribe(data => {
      this.isFormDirty = data;
    }, error => console.error(error));
    this.addIdToName(this.clients);
    this.setClientAutoComplete();
  }

  clear() {
    this.clientListControl.setValue('');
    this.rpsBillClient.emit(this.clientListControl.value);
    this.clientSearchService.setFormDirtyState(false);
  }

  onClearClient() {
    if (this.isFormDirty) {
      this.openConfirmationDialog();
    } else {
      this.clear();
    }
  }

  displayName(client: Client) {
    return client ? client.ClientName : client;
  }

  getClientInvoice() {
    this.rpsBillClient.emit(this.clientListControl.value);
  }

  private addIdToName(data: Client[]) {
    for (let x = 0; x < data.length; x++) {
      data[x].ClientName = data[x].ClientId + ' - ' + data[x].ClientName;
    }
  }

  private filterClients(name: string): Client[] {
    return this.clients.filter(client =>
      client.ClientName.toLowerCase().includes(name.toLowerCase())
    );
  }

  private openConfirmationDialog() {
    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent);

    this.confirmationDialogRef.afterClosed().subscribe(ignoreChanges => {
      if (ignoreChanges) {
        this.clear();
      }
    });
  }

    private setClientAutoComplete() {
      this.filteredClients = this.clientListControl.valueChanges
        .pipe(
          map(client => client && typeof client === 'object' ? client.ClientName : client),
          map(val => {
                  if (val.length > 2) {
                    return this.filterClients(val);
                  } else {
                    return;
                  }
                })
        );
    }
}
