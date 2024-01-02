import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContactUsForm } from './interfaces/contact-us.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlsOf } from './interfaces/form.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public contactUsForm!: FormGroup<ControlsOf<ContactUsForm>>;

  constructor(private http: HttpClient) {
    this.contactUsForm = new FormGroup<ControlsOf<ContactUsForm>>({
      name: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      number: new FormControl<string | null>(null),
      message: new FormControl<string | null>(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.contactUsForm.valid) {
      // Send data to your backend service to handle the email sending
      console.log(this.contactUsForm.value);

      // Clear the form after submission if needed
      this.contactUsForm.reset();
    }
  }

  public sendEmail(): void {
    if (this.contactUsForm.valid) {
      const contactUsData = this.contactUsForm.value;

      // Replace 'your-api-endpoint' with the actual API endpoint for sending emails
      const apiEndpoint = 'http://localhost:3000/send-email';

      // Make a POST request to the backend
      this.http.post(apiEndpoint, contactUsData).subscribe({
        next: (response) => {
          console.log('Email sent successfully!', response);
          // You can handle success actions here
        },
        error: (error) => {
          console.error('Error sending email:', error);
          // You can handle error actions here
        }
      });

      // Optionally, reset the form after successful submission
      this.contactUsForm.reset();
    }
  }
}
