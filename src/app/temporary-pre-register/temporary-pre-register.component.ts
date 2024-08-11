import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-temporary-pre-register',
  templateUrl: './temporary-pre-register.component.html',
  styleUrls: ['./temporary-pre-register.component.scss']
})
export class TemporaryPreRegisterComponent implements OnInit {

  model: NgbDateStruct | undefined;
  constructor() { }

  ngOnInit() {
  }

}
