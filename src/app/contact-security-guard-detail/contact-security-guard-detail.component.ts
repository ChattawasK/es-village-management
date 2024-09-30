import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ResidentService } from '../../services/resident.service';
import { TransactionIncidentService } from '../../services/transactionIncident.service';
import { WalkInRegisterSuccessComponent } from '../modals/walk-in-register-success/walk-in-register-success.component';

@Component({
  selector: 'app-contact-security-guard-detail',
  templateUrl: './contact-security-guard-detail.component.html',
  styleUrls: ['./contact-security-guard-detail.component.scss']
})
export class ContactSecurityGuardDetailComponent implements OnInit {
  message: string | undefined;
  url: string | ArrayBuffer | null | undefined;

  village: any;
  id = null;
  transactionIncidentData: any = null;

  private activatedRoute = inject(ActivatedRoute);
  constructor(private customerService:CustomerService,
    private localService: LocalService,
    private transactionIncidentService: TransactionIncidentService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.village = data.data.villages[0];
      this.localService.saveData("villageShortName",this.village.villageShortName)
      this.getData();
    });
  }

  getData(){
    this.transactionIncidentService.get(this.id,this.village.villageShortName).subscribe(data => {
      this.transactionIncidentData = data;
      this.url = `data:image/jpeg;base64,${data.imageBase64}`;
    });
  }

  approve(){
    this.transactionIncidentService.acknowledge(this.id,this.village.villageShortName).subscribe(data => {
      console.log(data)
    });
  }

}
