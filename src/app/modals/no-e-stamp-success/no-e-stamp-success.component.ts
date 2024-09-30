import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-no-e-stamp-success',
  templateUrl: './no-e-stamp-success.component.html',
  styleUrls: ['./no-e-stamp-success.component.scss']
})
export class NoEStampSuccessComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  constructor() { }

  ngOnInit() {
  }
}
