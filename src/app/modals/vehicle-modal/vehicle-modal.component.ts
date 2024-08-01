import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);

	@Input() name: string | undefined;
  @Input() mode: string | undefined;
  constructor() { }

  ngOnInit() {
  }

}
