import { Component, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reject-request-vehicle',
  templateUrl: './reject-request-vehicle.component.html',
  styleUrls: ['./reject-request-vehicle.component.scss']
})
export class RejectRequestVehicleComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  reason = '';
  constructor() { }

  ngOnInit() {
  }

  reject(){
    this.activeModal.close(this.reason);
  }

}
