import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { HouseService } from '../../services/house.service';
import { LocalService } from '../../services/local.service';
import { ResidentService } from '../../services/resident.service';
import { WalkInRegisterService } from '../../services/walk-in-register.service';
import { WalkInRegisterSuccessComponent } from '../modals/walk-in-register-success/walk-in-register-success.component';

@Component({
  selector: 'app-e-stamp-out',
  templateUrl: './e-stamp-out.component.html',
  styleUrls: ['./e-stamp-out.component.scss']
})
export class EStampOutComponent implements OnInit {
  village: any;
  house: any = null;
  houseId = 0;
  houses:any[] = [];
  walkInData :any[] = [];
  private houseService = inject(HouseService);

  constructor(private customerService:CustomerService,
    private localService: LocalService,
    private walkInRegisterService: WalkInRegisterService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.village = data.data.villages[0];
      this.localService.saveData("villageShortName",this.village.villageShortName);
      this.getHouses();
    });
  }

  getHouses(){
    this.houseService.get(this.localService.getData('villageShortName')).subscribe(data => {
      this.houses = data;
    });
  }

  search(){
    this.walkInRegisterService.searchDelivery(this.houseId,this.localService.getData('villageShortName')).subscribe(data => {
      console.log(data);
      this.walkInData = data;
    });
  }
}
