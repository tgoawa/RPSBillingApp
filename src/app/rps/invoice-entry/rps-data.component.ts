import { Component, OnInit } from '@angular/core';
import { RpsClient } from 'app/client';

@Component({
  selector: 'app-rps-data',
  templateUrl: './rps-data.component.html',
  styleUrls: ['./rps-data.component.css']
})
export class RPSDataComponent implements OnInit {
  private clientId: number;

  client: RpsClient = {
    ClientId: 1,
    ClientName: 'test name',
    MaintenanceFee: 200,
    Year: 2017,
    Quarter: 1,
    NumberParticipants: 0,
    DollarPerParticipant: 0,
    ParticipantDollars: 0,
    NumberLoans: 0,
    DollarPerLoan: 0,
    LoanDollars: 0,
    Form5500: 0,
    Form8955: 0,
    SpecialFeesText: 0,
    SpecialFeesDollars: 0,
    NumberDistributions: 0,
    DollarPerDistribution: 0,
    DistributionDollars: 0,
    Assets: 0,
    BasisPointFee: 0,
    Credits: 0
};
  constructor() { }

  ngOnInit() {
  }

  clientSearch(event) {
    this.clientId = event;
  }
}
