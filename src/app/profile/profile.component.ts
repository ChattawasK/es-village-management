import { LocalService } from './../../services/local.service';
import { VehicleService } from './../../services/vehicle.service';
import { CustomerService } from './../../services/customer.service';
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
  name = '';
  village: any;
  phoneNumber = '';
  cars :any[] = [];
  constructor(private customerService:CustomerService,
    private vehicleService: VehicleService,
    private localService: LocalService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.name = data.data.displayName;
      this.village = data.data.villages[0];
      this.phoneNumber = data.data.phoneNumber;
      this.localService.saveData("villageShortName",this.village.villageShortName)
      this.getVehicle();
    });
  }

  getVehicle(){
    this.vehicleService.getVehicles(this.village.villageShortName).subscribe(data => {
      this.cars = data;
    });
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
