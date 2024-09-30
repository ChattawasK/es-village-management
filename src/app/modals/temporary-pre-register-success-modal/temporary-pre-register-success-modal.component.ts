import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-temporary-pre-register-success-modal',
  templateUrl: './temporary-pre-register-success-modal.component.html',
  styleUrls: ['./temporary-pre-register-success-modal.component.scss']
})
export class TemporaryPreRegisterSuccessModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);

  constructor() { }

  ngOnInit() {
  }
}
