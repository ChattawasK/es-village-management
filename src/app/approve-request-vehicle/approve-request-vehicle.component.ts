import { LocalService } from './../../services/local.service';
import { ResidentCarService } from './../../services/resident-car.service';
import { Component, OnInit, inject } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveSuccessComponent } from '../modals/approve-success/approve-success.component';
import { RejectRequestVehicleComponent } from '../modals/reject-request-vehicle/reject-request-vehicle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-approve-request-vehicle',
  templateUrl: './approve-request-vehicle.component.html',
  styleUrls: ['./approve-request-vehicle.component.scss']
})
export class ApproveRequestVehicleComponent implements OnInit {
  id = 0;
  title = '';
  village: any = null;
  residentCar: any = null;
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  private router = inject(Router);
  private residentCarService = inject(ResidentCarService);
  private customerService = inject(CustomerService);
  private localService = inject(LocalService);
  constructor() { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.router.url.indexOf('approve-request-add-vehicle') > -1) {
      this.title = 'รายการคำขอเพิ่มทะเบียนรถ'
    } else {
      this.title = 'รายการคำขอแก้ไขทะเบียนรถ'
    }

    this.getProfile();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getProfile(){
    this.customerService.profile().subscribe(data => {
      this.village = data.data.villages[0];
      this.localService.saveData("villageShortName",this.village.villageShortName)
      this.getRacidentCar();
    });
  }

  getRacidentCar(){
    this.residentCarService.getResidentCar(this.id,this.localService.getData('villageShortName')).subscribe(data => {
      this.residentCar = data;
    });
  }

  approve(){
    this.residentCarService.approve(this.id,this.localService.getData('villageShortName')).subscribe(data => {
      const success = this.modalService.open(ApproveSuccessComponent);
    });

  }

  reject(){
    const reject = this.modalService.open(RejectRequestVehicleComponent);
    reject.result.then((data) => {
      this.residentCarService.reject(this.id,this.localService.getData('villageShortName'),{remark: data}).subscribe(data => {
      });
    },
    (error) => {

    });
  }

}
