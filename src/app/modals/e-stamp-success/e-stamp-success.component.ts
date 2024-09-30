import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-e-stamp-success',
  templateUrl: './e-stamp-success.component.html',
  styleUrls: ['./e-stamp-success.component.scss']
})
export class EStampSuccessComponent implements OnInit {

  plateNo = ''
  activeModal = inject(NgbActiveModal);

  constructor() { }

  ngOnInit() {
  }

}
