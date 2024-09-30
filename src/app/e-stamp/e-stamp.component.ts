import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ResidentService } from '../../services/resident.service';
import { WalkInRegisterService } from '../../services/walk-in-register.service';
import { WalkInRegisterSuccessComponent } from '../modals/walk-in-register-success/walk-in-register-success.component';
import { EStampSuccessComponent } from '../modals/e-stamp-success/e-stamp-success.component';
import { RejectEStampComponent } from '../modals/reject-e-stamp/reject-e-stamp.component';

@Component({
  selector: 'app-e-stamp',
  templateUrl: './e-stamp.component.html',
  styleUrls: ['./e-stamp.component.scss']
})
export class EStampComponent implements OnInit {
  village: any;
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
      this.getWalkInData();
    });
  }

  getWalkInData(){
    if(this.id){
      this.walkInRegisterService.get(this.id,this.village.villageShortName).subscribe(data => {
        this.walkInData = data;
      });
    }

  }

  approve(){
    this.walkInRegisterService.residentApproved(this.id,this.village.villageShortName).subscribe(data => {
      const success = this.modalService.open(EStampSuccessComponent);
      success.componentInstance.plateNo = this.walkInData.plateNo;
    });
  }

  reject(){
    const reject = this.modalService.open(RejectEStampComponent);
    reject.componentInstance.plateNo = this.walkInData.plateNo;
    reject.result.then((data) => {
      this.walkInRegisterService.residentRejected(this.id,this.village.villageShortName).subscribe(data => {
      });
    },
    (error) => {

    });
	}

}
