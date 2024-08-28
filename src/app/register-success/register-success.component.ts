import { CustomerService } from './../../services/customer.service';
import { LocalService } from './../../services/local.service';
import { VillageService } from './../../services/village.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
  isSaved: boolean | undefined;
  villages: any[] = [];
  selectedVillage = "";
  constructor(
    private villageService: VillageService,
    private localService: LocalService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.villageService.getVillages().subscribe((data: any) =>{
      this.villages = data.data;
    });
  }

  save(){
    this.customerService.register(
      this.localService.getData("phoneNumber"),
      this.localService.getData("otpToken"),
      this.localService.getData("lineUserId"),
      this.selectedVillage
    ).subscribe((data: any) =>{
      this.isSaved = true;
    });

  }
}
