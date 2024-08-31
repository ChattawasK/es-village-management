import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-vehicle-modal',
  templateUrl: './delete-vehicle-modal.component.html',
  styleUrls: ['./delete-vehicle-modal.component.scss']
})
export class DeleteVehicleModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);
  plateNo: string | undefined = "";
  province: string = "";
  constructor() { }

  ngOnInit() {
  }

}
