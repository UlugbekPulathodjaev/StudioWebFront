import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private api: ServicesService, private formBuilder: FormBuilder) {}

  customerForm!: FormGroup;

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      FullName: ["", Validators.required],
      PhoneNumber: ["", [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]],
      EMail: ["", [Validators.required, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)]],
      Budget: ["", [Validators.required, Validators.pattern(/^[\d ]*$/)]],
      Comment: ["", Validators.required],
    });
  }

  post() {
    // Check for null or undefined values in properties other than 'Comment'
    const hasNullValues = Object.keys(this.customerForm.controls).some(
      (key) => key !== 'Comment' && (this.customerForm.get(key)?.value === null || this.customerForm.get(key)?.value === undefined || this.customerForm.get(key)?.value === '')
    );

    if (hasNullValues) {
      alert('One or more required fields are empty, except for the Comment field.');
      return;
    }

    if (this.customerForm.get('PhoneNumber')?.hasError('pattern')) {
      console.error('Invalid phone number format:', this.customerForm.get('PhoneNumber')?.errors?.['pattern']);
      alert('Invalid phone number format');
      return;
    }

    if (this.customerForm.get('EMail')?.hasError('pattern')) {
      console.error('Invalid email format:', this.customerForm.get('EMail')?.errors?.['pattern']);
      alert('Invalid email format');
      return;
    }

    if (this.customerForm.get('Budget')?.hasError('pattern')) {
      console.error('Invalid budget format:', this.customerForm.get('Budget')?.errors?.['pattern']);
      alert('Invalid budget format');
      return;
    }

    alert(this.customerForm);
    this.api.postCustomer(this.customerForm.getRawValue()).subscribe({
      next: () => {
        alert('Success');
      },
      error: () => {
        alert('Error');
      },
    });
  }
}
