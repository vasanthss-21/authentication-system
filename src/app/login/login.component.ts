import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  registeredEmail: string | null = null;
  registeredPassword: string | null = null;
  name: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.registeredEmail = params['email'] || null;
      this.registeredPassword = params['password'] || null;
      this.name = params['name'] || null; 
    });
  }
  
  togglePasswordVisibility(event: Event) {
    this.showPassword = (event.target as HTMLInputElement).checked;
  }

  onLogin() {
    const enteredEmail = this.loginForm.get('email')?.value;
    const enteredPassword = this.loginForm.get('password')?.value;

    if (enteredEmail === this.registeredEmail && enteredPassword === this.registeredPassword) {
      this.toastr.success('Login successful', 'Welcome!');
      this.router.navigate(['/home', this.name]);
    } else {
      this.toastr.error('Email or password is incorrect', 'Login Failed');
    }
  }
}
