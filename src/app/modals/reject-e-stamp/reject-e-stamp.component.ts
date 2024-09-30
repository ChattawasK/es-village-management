import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reject-e-stamp',
  templateUrl: './reject-e-stamp.component.html',
  styleUrls: ['./reject-e-stamp.component.scss']
})
export class RejectEStampComponent implements OnInit {

  plateNo = ''
  activeModal = inject(NgbActiveModal);

  constructor() { }

  ngOnInit() {
  }

}
