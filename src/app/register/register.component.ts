import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private router: Router, private toastr: ToastrService) {}

  togglePasswordVisibility(event: Event) {
    this.showPassword = (event.target as HTMLInputElement).checked;
  }

  onSubmit() {
  if (this.registerForm.valid) {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const name = this.registerForm.get('name')?.value;
    this.toastr.success('Registration successful', 'Login Now!');
    this.router.navigate(['/login', email, password, name]);
  } else {
    this.toastr.error('Please fill out the form!', 'Error');
  }
}

}
