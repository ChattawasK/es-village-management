import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModalComponent } from '../modals/vehicle-modal/vehicle-modal.component';
import { AddVehicleSuccessModalComponent } from '../modals/add-vehicle-success-modal/add-vehicle-success-modal.component';
import { DeleteVehicleModalComponent } from '../modals/delete-vehicle-modal/delete-vehicle-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private modalService = inject(NgbModal);
  cars=  [
    {
      licensePlate:'ปล8345',
      province:"กรุงเทพมหานคร",
      isApprove:true,
    },
    {
      licensePlate:'ปล8345',
      province:"กรุงเทพมหานคร",
      isApprove:false,
    },
    {
      licensePlate:'ปล8345',
      province:"กรุงเทพมหานคร",
      isApprove:null,
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  openVehicelModal(mode: any) {
		const modalRef = this.modalService.open(VehicleModalComponent);
		modalRef.componentInstance.mode = mode;
    modalRef.result.then((data) => {
      const success = this.modalService.open(AddVehicleSuccessModalComponent);
      success.componentInstance.mode = mode;
    },
    (error) => {

    });
	}

  openDeleteModal() {
		const modalRef = this.modalService.open(DeleteVehicleModalComponent);

    modalRef.result.then((data) => {

    },
    (error) => {

    });
	}

}
