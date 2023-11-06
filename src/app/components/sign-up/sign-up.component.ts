import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      conpassword: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
  async onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      (await this.usersService.signUp(signupData)).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
          console.log('You are registered');
        }
      );
    }
  }
}
