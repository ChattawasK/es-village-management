import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'es-village-management';

  constructor(private modalService: NgbModal) {

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
