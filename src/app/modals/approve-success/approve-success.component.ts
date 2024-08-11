import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve-success',
  templateUrl: './approve-success.component.html',
  styleUrls: ['./approve-success.component.scss']
})
export class ApproveSuccessComponent implements OnInit {
  activeModal = inject(NgbActiveModal);

	@Input() mode: string | undefined;
  constructor() { }

  ngOnInit() {
  }

}
