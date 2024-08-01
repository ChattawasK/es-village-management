import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visitor-pre-register',
  templateUrl: './visitor-pre-register.component.html',
  styleUrls: ['./visitor-pre-register.component.scss']
})
export class VisitorPreRegisterComponent implements OnInit {

  model: NgbDateStruct | undefined;
  constructor() { }

  ngOnInit() {
  }

}
