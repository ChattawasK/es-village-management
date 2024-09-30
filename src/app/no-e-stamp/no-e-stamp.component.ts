import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ResidentService } from '../../services/resident.service';
import { WalkInRegisterService } from '../../services/walk-in-register.service';
import { TemporaryPreRegisterSuccessModalComponent } from '../modals/temporary-pre-register-success-modal/temporary-pre-register-success-modal.component';
import { NoEStampSuccessComponent } from '../modals/no-e-stamp-success/no-e-stamp-success.component';

@Component({
  selector: 'app-no-e-stamp',
  templateUrl: './no-e-stamp.component.html',
  styleUrls: ['./no-e-stamp.component.scss']
})
export class NoEStampComponent implements OnInit {

  model: NgbDateStruct | undefined;
  message: string | undefined;
  imagePath: any;
  url: string | ArrayBuffer | null | undefined;

  village: any;
  houses: any[] = [];
  house: any = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  dateValue!: NgbDateStruct | undefined;
  form = new FormGroup({
    registrationDate: new FormControl<string|null>({value: null, disabled: true}),
    houseId: new FormControl(null, [
      Validators.required,
    ]),
    houseNumber: new FormControl({value: null, disabled: true}),
    plateNo: new FormControl(null),
    visitorFullName: new FormControl({value: null, disabled: true}, [
      Validators.required,
    ]),
    visitorPhoneNo: new FormControl({value: null, disabled: true}, [
      Validators.required,
    ]),
    reason: new FormControl({value: null, disabled: true}, [
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
  private router = inject(Router);
  id = null;
  fineAmount = 0;

  private modalService = inject(NgbModal);

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
        this.form.controls.houseId.setValue(data.houseId);
        this.form.controls.houseNumber.setValue(data.houseNumber);
        this.form.controls.plateNo.setValue(data.plateNo);
        this.form.controls.visitorFullName.setValue(data.visitorFullName);
        this.form.controls.visitorPhoneNo.setValue(data.visitorPhoneNo);
        this.form.controls.reason.setValue(data.reason);
        const dateObject = new Date(data.registrationDate);
        const formattedDate = this.formatDate(dateObject);
        this.form.controls.registrationDate.setValue(formattedDate);
        this.fineAmount = data.fineAmount;
      });
    }
  }

  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with 0
    const year = date.getFullYear(); // Get full year

    return `${day}/${month}/${year}`;
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
      this.walkInRegisterService.updateImage(formData,this.localService.getData("villageShortName"),this.id).subscribe(x =>{

        if(this.fineAmount > 0){
          this.router.navigate(['summary/'+this.id]);
        }else{
          const success = this.modalService.open(NoEStampSuccessComponent);
        }
      })
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

}
