import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveSuccessComponent } from '../modals/approve-success/approve-success.component';
import { RejectRequestVehicleComponent } from '../modals/reject-request-vehicle/reject-request-vehicle.component';

@Component({
  selector: 'app-approve-temporary-pre-register',
  templateUrl: './approve-temporary-pre-register.component.html',
  styleUrls: ['./approve-temporary-pre-register.component.scss']
})
export class ApproveTemporaryPreRegisterComponent implements OnInit {

  private modalService = inject(NgbModal);
  constructor() { }

  ngOnInit() {
  }

  approve(){
    const success = this.modalService.open(ApproveSuccessComponent);
  }

  reject(){
    const success = this.modalService.open(RejectRequestVehicleComponent);
  }

}
