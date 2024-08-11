import { Component, OnInit, inject } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveSuccessComponent } from '../modals/approve-success/approve-success.component';
import { RejectRequestVehicleComponent } from '../modals/reject-request-vehicle/reject-request-vehicle.component';

@Component({
  selector: 'app-approve-request-vehicle',
  templateUrl: './approve-request-vehicle.component.html',
  styleUrls: ['./approve-request-vehicle.component.scss']
})
export class ApproveRequestVehicleComponent implements OnInit {
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
