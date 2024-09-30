import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ResidentService } from '../../services/resident.service';
import { WalkInRegisterService } from '../../services/walk-in-register.service';
import { WalkInRegisterSuccessComponent } from '../modals/walk-in-register-success/walk-in-register-success.component';
import { TransactionIncidentService } from '../../services/transactionIncident.service';

@Component({
  selector: 'app-contact-security-guard',
  templateUrl: './contact-security-guard.component.html',
  styleUrls: ['./contact-security-guard.component.scss']
})
export class ContactSecurityGuardComponent implements OnInit {


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
    userId: new FormControl(null),
    houseId: new FormControl(null, [
      Validators.required,
    ]),
    houseNumber: new FormControl(null),
    message: new FormControl(null, [
      Validators.required,
    ]),
    imageUpload: new FormControl(null, [
      Validators.required,
    ]),
  });

  submitted = false;
  file = null;
  fileName = '';

  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  id = null;
  walkInData: any;
  name: any;
  phoneNumber: any;

  constructor(private customerService:CustomerService,
    private localService: LocalService,
    private residentService: ResidentService,
    private transactionIncidentService: TransactionIncidentService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.id = this.activatedRoute.snapshot.params['id'];
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
      this.form.controls.houseId.setValue(this.house.id);
    });
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
      const formData: FormData = new FormData();
      formData.append('Image', this.file!);
      formData.append('ImageName', this.fileName);
      formData.append('HouseId', this.form.controls.houseId.value!);
      formData.append('HouseName', this.house.nameTh);
      formData.append('Message', this.form.controls.message.value!);
      this.transactionIncidentService.create(formData,this.localService.getData("villageShortName")).subscribe(x =>{
        const success = this.modalService.open(WalkInRegisterSuccessComponent);
      })
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

}
