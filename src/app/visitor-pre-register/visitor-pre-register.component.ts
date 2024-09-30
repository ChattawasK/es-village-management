import { VisitorPreRegisterService } from './../../services/visitor-pre-register.service';
import { ResidentService } from './../../services/resident.service';
import { ProvinceService } from './../../services/province.service';
import { Component, inject, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { VehicleService } from '../../services/vehicle.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApproveSuccessComponent } from '../modals/approve-success/approve-success.component';
import { PreRegistorSuccessModalComponent } from '../modals/pre-registor-success-modal/pre-registor-success-modal.component';

@Component({
  selector: 'app-visitor-pre-register',
  templateUrl: './visitor-pre-register.component.html',
  styleUrls: ['./visitor-pre-register.component.scss']
})
export class VisitorPreRegisterComponent implements OnInit {

  dateValue!: NgbDateStruct | undefined;
  name = '';
  village: any;
  phoneNumber = '';
  provinces: any[] = [];
  house: any = null;

  form = new FormGroup({
    registerationDate: new FormControl(''),
    registerationDateObj: new FormControl(this.dateValue!, [
      Validators.required,
    ]),
    houseId: new FormControl(null, [
      Validators.required,
    ]),
    houseNumber: new FormControl(null, [
      Validators.required,
    ]),
    plateNo: new FormControl(null, [
      Validators.required,
    ]),
    plateProvinceId: new FormControl('', [
      Validators.required,
    ]),
    visitorFullName: new FormControl(null, [
      Validators.required,
    ]),
    visitorPhoneNo: new FormControl(null, [
      Validators.required,
    ]),
    reason: new FormControl(null, [
      Validators.required,
    ])
  });

  submitted = false;

  private modalService = inject(NgbModal);

  constructor(private customerService:CustomerService,
    private visitorPreRegisterService: VisitorPreRegisterService,
    private localService: LocalService,
    private provinceService: ProvinceService,
    private residentService: ResidentService,

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
      this.form.controls.houseNumber.setValue(this.house.nameTh);
      this.form.controls.houseId.setValue(this.house.id);
    });
  }

  loadProvinces(){
    this.provinceService.getProvinces().subscribe((data: any) => {
      this.provinces = data;
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      var dateObj = this.form.controls.registerationDateObj.value
      this.form.controls.registerationDate.setValue(dateObj?.year +'-'+ dateObj?.month + '-'+dateObj?.day);
      this.visitorPreRegisterService.create(this.form.value,this.localService.getData("villageShortName")).subscribe(data => {
        const success = this.modalService.open(PreRegistorSuccessModalComponent);
        this.form.reset();
        this.submitted = false;
      });

    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }
}
