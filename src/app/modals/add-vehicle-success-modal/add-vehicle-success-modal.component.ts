import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-vehicle-success-modal',
  templateUrl: './add-vehicle-success-modal.component.html',
  styleUrls: ['./add-vehicle-success-modal.component.scss']
})
export class AddVehicleSuccessModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

	@Input() mode: string | undefined;
  constructor() { }

  ngOnInit() {
  }


}
