import { Component, OnInit, Input } from '@angular/core';
import { RpsClient } from 'app/client';

@Component({
  selector: 'app-rps-form',
  templateUrl: './rps-form.component.html',
  styleUrls: ['./rps-form.component.css']
})
export class RpsFormComponent implements OnInit {
  @Input() rpsClient: RpsClient;
  constructor() { }

  ngOnInit() {
  }

}
