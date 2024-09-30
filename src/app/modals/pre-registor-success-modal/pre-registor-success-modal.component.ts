import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pre-registor-success-modal',
  templateUrl: './pre-registor-success-modal.component.html',
  styleUrls: ['./pre-registor-success-modal.component.scss']
})
export class PreRegistorSuccessModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

	@Input() mode: string | undefined;
  constructor() { }

  ngOnInit() {
  }

}
