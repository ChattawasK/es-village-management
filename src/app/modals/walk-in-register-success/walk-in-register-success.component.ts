import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-walk-in-register-success',
  templateUrl: './walk-in-register-success.component.html',
  styleUrls: ['./walk-in-register-success.component.scss']
})
export class WalkInRegisterSuccessComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  constructor() { }

  ngOnInit() {
  }

}
