import { TemporaryPreRegisterService } from './../../services/temporary-pre-register.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ProvinceService } from '../../services/province.service';
import { ResidentService } from '../../services/resident.service';
import { VisitorPreRegisterService } from '../../services/visitor-pre-register.service';
import { PreRegistorSuccessModalComponent } from '../modals/pre-registor-success-modal/pre-registor-success-modal.component';
import { TemporaryPreRegisterSuccessModalComponent } from '../modals/temporary-pre-register-success-modal/temporary-pre-register-success-modal.component';

@Component({
  selector: 'app-temporary-pre-register',
  templateUrl: './temporary-pre-register.component.html',
  styleUrls: ['./temporary-pre-register.component.scss']
})
export class TemporaryPreRegisterComponent implements OnInit {

  startDateValue!: NgbDateStruct | undefined;
  endDateValue!: NgbDateStruct | undefined;
  name = '';
  village: any;
  phoneNumber = '';
  provinces: any[] = [];
  house: any = null;

  form = new FormGroup({
    registrationStartDate: new FormControl(''),
    registrationStartDateObj: new FormControl(this.startDateValue!, [
      Validators.required,
    ]),
    registrationEndDate: new FormControl(''),
    registrationEndDateObj: new FormControl(this.endDateValue!, [
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
    private temporaryPreRegisterService: TemporaryPreRegisterService,
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
      var startDateObj = this.form.controls.registrationStartDateObj.value
      this.form.controls.registrationStartDate.setValue(startDateObj?.year +'-'+ startDateObj?.month + '-'+startDateObj?.day);
      var endDateObj = this.form.controls.registrationEndDateObj.value
      this.form.controls.registrationEndDate.setValue(endDateObj?.year +'-'+ endDateObj?.month + '-'+endDateObj?.day);
      this.temporaryPreRegisterService.create(this.form.value,this.localService.getData("villageShortName")).subscribe(data => {
        const success = this.modalService.open(TemporaryPreRegisterSuccessModalComponent);
        this.form.reset();
        this.submitted = false;
      });

    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

}
