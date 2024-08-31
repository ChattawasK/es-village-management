import { ResidentService } from './../../services/resident.service';
import { ProvinceService } from './../../services/province.service';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-visitor-pre-register',
  templateUrl: './visitor-pre-register.component.html',
  styleUrls: ['./visitor-pre-register.component.scss']
})
export class VisitorPreRegisterComponent implements OnInit {

  model: NgbDateStruct | undefined;

  name = '';
  village: any;
  phoneNumber = '';
  provinces: any[] = [];
  house: any = null;
  constructor(private customerService:CustomerService,
    private vehicleService: VehicleService,
    private localService: LocalService,
    private provinceService: ProvinceService,
    private residentService: ResidentService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.loadProvinces();
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.name = data.data.displayName;
      this.village = data.data.villages[0];
      this.phoneNumber = data.data.phoneNumber;
      this.localService.saveData("villageShortName",this.village.villageShortName)
      this.getResident();
    });
  }

  getResident(){
    this.residentService.getResident(this.village.villageShortName).subscribe(data => {
      this.house = data.houses[0];
    });
  }

  loadProvinces(){
    this.provinceService.getProvinces().subscribe((data: any) => {
      this.provinces = data;
    })
  }


}
