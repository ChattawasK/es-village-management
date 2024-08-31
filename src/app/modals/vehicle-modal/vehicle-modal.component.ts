import { ProvinceService } from './../../../services/province.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;
  form: FormGroup | undefined;
  plateNo: string = '';
  provinceId: string = "";
  constructor(private provinceService: ProvinceService) { }

  ngOnInit() {
    this.submitted = false;
    this.loadProvinces();
    this.form = new FormGroup({
      plateNo: new FormControl(this.plateNo, [
        Validators.required,
      ]),
      provinceId: new FormControl(this.provinceId, [
        Validators.required,
      ])
    });
  }

  loadProvinces(){
    this.provinceService.getProvinces().subscribe((data: any) => {
      this.provinces = data;
    })
  }

  save(){
    this.submitted = true;
    if(this.form?.valid){
      this.activeModal.close(this.form.value);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }
}
