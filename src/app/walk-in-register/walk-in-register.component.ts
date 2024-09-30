import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ProvinceService } from '../../services/province.service';
import { ResidentService } from '../../services/resident.service';
import { VisitorPreRegisterService } from '../../services/visitor-pre-register.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WalkInRegisterService } from '../../services/walk-in-register.service';
import { ActivatedRoute } from '@angular/router';
import { WalkInRegisterSuccessComponent } from '../modals/walk-in-register-success/walk-in-register-success.component';

@Component({
  selector: 'app-walk-in-register',
  templateUrl: './walk-in-register.component.html',
  styleUrls: ['./walk-in-register.component.scss']
})
export class WalkInRegisterComponent implements OnInit {

  model: NgbDateStruct | undefined;
  message: string | undefined;
  imagePath: any;
  url: string | ArrayBuffer | null | undefined;

  village: any;
  houses: any[] = [];
  house: any = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  dateValue!: NgbDateStruct | undefined;
  registrationDate : Date | null = new Date();
  form = new FormGroup({
    id: new FormControl(null),
    registrationDate: new FormControl({value: null, disabled: true}),
    houseId: new FormControl(null, [
      Validators.required,
    ]),
    houseNumber: new FormControl(null),
    plateNo: new FormControl(null),
    visitorFullName: new FormControl(null, [
      Validators.required,
    ]),
    visitorPhoneNo: new FormControl(null, [
      Validators.required,
    ]),
    reason: new FormControl(null, [
      Validators.required,
    ]),
    imageUpload: new FormControl(null, [
      Validators.required,
    ]),
    isDelivery : new FormControl(false)
  });

  submitted = false;
  file = null;
  fileName = '';

  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  id = null;
  walkInData: any;

  constructor(private customerService:CustomerService,
    private localService: LocalService,
    private residentService: ResidentService,
    private walkInRegisterService: WalkInRegisterService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.village = data.data.villages[0];
      this.localService.saveData("villageShortName",this.village.villageShortName)
      this.getResident();
      this.getWalkInData();
    });
  }

  getResident(){
    this.residentService.getResident(this.village.villageShortName).subscribe(data => {
      this.houses = data.houses;
      this.form.controls.houseId.setValue(this.houses[0].id);
    });
  }

  getWalkInData(){
    if(this.id){
      this.walkInRegisterService.get(this.id,this.village.villageShortName).subscribe(data => {
        this.registrationDate = new Date(data.registrationDate);
        this.form.controls.registrationDate.setValue(data.registrationDate);
        this.form.controls.id.setValue(data.id);
        this.walkInData = data;
        // this.form.controls.plateNo.setValue(data.plateNo);
        // this.form.controls.visitorFullName.setValue(data.visitorFullName);
        // this.form.controls.visitorPhoneNo.setValue(data.visitorPhoneNo);
        // this.form.controls.reason.setValue(data.reason);
        // this.form.controls.visitorPhoneNo.setValue(data.visitorPhoneNo);
      });
    }

  }

  onClickUpload(): void {
    this.fileInput.nativeElement.click();
  }


  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    this.file = files[0];
    this.fileName = files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.url = reader.result;
    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      var house = this.houses.find(x => x.id == this.form.controls.houseId.value!);
      const formData: FormData = new FormData();
      formData.append('Image', this.file!);
      formData.append('ImageName', this.fileName);
      formData.append('HouseId', this.form.controls.houseId.value!);
      formData.append('HouseNumber', house.nameTh);
      formData.append('VisitorFullName', this.form.controls.visitorFullName.value!);
      formData.append('VisitorPhoneNo', this.form.controls.visitorPhoneNo.value!);
      formData.append('Reason', this.form.controls.reason.value!);
      formData.append('PlateNo', "12345");
      formData.append('IsDelivery', this.form.controls.isDelivery.value!.toString());
      this.walkInRegisterService.create(formData,this.id,this.localService.getData("villageShortName")).subscribe(x =>{
        const success = this.modalService.open(WalkInRegisterSuccessComponent);
      })
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }
}
