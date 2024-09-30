import { Component, inject, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { LocalService } from '../../services/local.service';
import { ResidentService } from '../../services/resident.service';
import { WalkInRegisterService } from '../../services/walk-in-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  model: NgbDateStruct | undefined;
  message: string | undefined;
  imagePath: any;
  url: string | ArrayBuffer | null | undefined;
  name = '';

  village: any;
  houses: any[] = [];
  house: any = null;
  isShowQr : boolean = false;
  data:any = null;
  phoneNumber = "";
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  id = null;
  fineAmount: any;

  constructor(private customerService:CustomerService,
    private localService: LocalService,
    private residentService: ResidentService,
    private walkInRegisterService: WalkInRegisterService,
    private visitorService: VisitorService
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
      //this.form.controls.houseId.setValue(this.houses[0].id);
    });
  }

  getWalkInData(){
    if(this.id){
      this.visitorService.get(this.id,this.village.villageShortName).subscribe(data => {
        this.data = data;
        this.phoneNumber = data.visitorPhoneNo;
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

}
