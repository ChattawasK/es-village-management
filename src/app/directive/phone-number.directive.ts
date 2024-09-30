import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appPhoneNumber]' // Use this selector in the template to apply the directive
})
export class PhoneNumberDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.formatPhoneNumber(this.el.nativeElement.value); // Format on initial load
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    let input = this.el.nativeElement.value;
    this.formatPhoneNumber(input);
  }

  private formatPhoneNumber(input: string) {
    // Remove all non-digit characters
    input = input.replace(/\D/g, '');

    // Ensure that the input doesn't exceed 10 characters
    if (input.length > 10) {
      input = input.substring(0, 10);
    }

    // Format the input as xxx-xxx-xxxx
    const areaCode = input.substring(0, 3);
    const middlePart = input.substring(3, 6);
    const lastPart = input.substring(6, 10);

    if (input.length > 6) {
      input = `${areaCode}-${middlePart}-${lastPart}`;
    } else if (input.length > 3) {
      input = `${areaCode}-${middlePart}`;
    } else if (input.length > 0) {
      input = `${areaCode}`;
    }

    // Set the formatted value back to the input field
    this.el.nativeElement.value = input;
  }
}
