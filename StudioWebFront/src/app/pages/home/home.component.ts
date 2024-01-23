import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private api: ServicesService, private formBuilder: FormBuilder) { }

  customerForm!: FormGroup

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      FullName: ["", Validators.required],
      PhoneNumber: ["", Validators.required],
      EMail: ["", Validators.required],
      Budget: ["", Validators.required],
      Comment: ["", Validators.required]
    })
  }
  post() {
    alert(this.customerForm);
    this.api.postCustomer(this.customerForm.getRawValue())
      .subscribe({
        next: () => {
          alert("Success")
        },
        error: () => {
          alert("Error")
        }
      })
  }
}

