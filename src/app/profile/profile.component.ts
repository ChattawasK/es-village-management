import { ResidentService } from './../../services/resident.service';
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
  house: any = null;
  constructor(private customerService:CustomerService,
    private vehicleService: VehicleService,
    private localService: LocalService,
    private residentService: ResidentService
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
      this.getResident();
    });
  }

  getVehicle(){
    this.vehicleService.getVehicles(this.village.villageShortName).subscribe(data => {
      this.cars = data;
    });
  }

  getResident(){
    this.residentService.getResident(this.village.villageShortName).subscribe(data => {
      this.house = data.houses[0];
    });
  }
  openVehicelModal(mode: any,vehicle: any) {
		const modalRef = this.modalService.open(VehicleModalComponent);
		modalRef.componentInstance.mode = mode;
    if(mode == 'edit'){
      modalRef.componentInstance.plateNo = vehicle.plateNo
      //modalRef.componentInstance.province = data.plateProvince;
    }
    modalRef.result.then((data) => {
      if(mode == 'add'){
        this.vehicleService.createVehicle(data.plateNo,data.provinceId,this.localService.getData("villageShortName")).subscribe(data => {
          const success = this.modalService.open(AddVehicleSuccessModalComponent);
          success.componentInstance.mode = mode;

          this.getVehicle();
        })
      } else if(mode == 'edit'){
        this.vehicleService.updateVehicle(vehicle.id,data.plateNo,data.provinceId,this.localService.getData("villageShortName")).subscribe(data => {
          const success = this.modalService.open(AddVehicleSuccessModalComponent);
          success.componentInstance.mode = mode;
          this.getVehicle();
        })
      }
    },
    (error) => {

    });
	}

  openDeleteModal(data:any) {
		const modalRef = this.modalService.open(DeleteVehicleModalComponent);
    modalRef.componentInstance.plateNo = data.plateNo;
    modalRef.componentInstance.province = data.plateProvince;
    modalRef.result.then(() => {
      this.vehicleService.deleteVehicle(data.id,this.localService.getData("villageShortName")).subscribe(data => {
        this.getVehicle();
      })
    },
    (error) => {

    });
	}

}
