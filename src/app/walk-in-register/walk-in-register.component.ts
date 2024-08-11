import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-walk-in-register',
  templateUrl: './walk-in-register.component.html',
  styleUrls: ['./walk-in-register.component.scss']
})
export class WalkInRegisterComponent implements OnInit {

  model: NgbDateStruct | undefined;
  message: string | undefined;
  imagePath: any;
  url: string | ArrayBuffer | null | undefined;
  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.url = reader.result;
    }
}
}
