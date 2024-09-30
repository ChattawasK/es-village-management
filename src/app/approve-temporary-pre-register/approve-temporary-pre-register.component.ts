import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveSuccessComponent } from '../modals/approve-success/approve-success.component';
import { RejectRequestVehicleComponent } from '../modals/reject-request-vehicle/reject-request-vehicle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TemporaryPreRegisterService } from '../../services/temporary-pre-register.service';
import { LocalService } from '../../services/local.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-approve-temporary-pre-register',
  templateUrl: './approve-temporary-pre-register.component.html',
  styleUrls: ['./approve-temporary-pre-register.component.scss']
})
export class ApproveTemporaryPreRegisterComponent implements OnInit {

  id = 0;
  title = '';
  village: any = null;
  temporaryPreRegister: any = null;
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  private temporaryPreRegisterService = inject(TemporaryPreRegisterService);
  private localService = inject(LocalService);
  private customerService = inject(CustomerService);
  constructor() { }

  ngOnInit() {
    this.getProfile();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.village = data.data.villages[0];
      this.localService.saveData("villageShortName",this.village.villageShortName)
      this.getTemporaryPreRegister();
    });
  }

  getTemporaryPreRegister(){
    this.temporaryPreRegisterService.get(this.id,this.localService.getData('villageShortName')).subscribe(data => {
      console.log(data);
      this.temporaryPreRegister = data;
    });
  }

  approve(){
    this.temporaryPreRegisterService.approve(this.id,this.localService.getData('villageShortName')).subscribe(data => {
      const success = this.modalService.open(ApproveSuccessComponent);
    });
  }

  reject(){
    const reject = this.modalService.open(RejectRequestVehicleComponent);
    reject.result.then((data) => {
      this.temporaryPreRegisterService.reject(this.id,this.localService.getData('villageShortName'),{remark: data}).subscribe(data => {
      });
    },
    (error) => {

    });
  }

}
