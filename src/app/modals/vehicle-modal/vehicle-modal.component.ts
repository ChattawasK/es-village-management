import { ProvinceService } from './../../../services/province.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnInit {
  provinces : any[] = [];
  activeModal = inject(NgbActiveModal);

  @Input() mode: string | undefined;

  name: string | undefined;
  province: string | undefined;
  constructor(private provinceService: ProvinceService) { }

  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces(){
    this.provinceService.getProvinces().subscribe((data: any) => {
      this.provinces = data;
    })
  }

}
