import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
      optionalMobileNumbers: this.fb.array([]),
    });
  }
  async onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      console.log('signUp data---->', signupData);

      (await this.usersService.signUp(signupData)).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
          console.log('You are registered');
        }
      );
    }
  }

  get optionalMobileNumbers(): FormArray {
    return this.signupForm.get('optionalMobileNumbers') as FormArray;
  }

  addOptionalMobileNumber() {
    if (this.optionalMobileNumbers.length < 5) {
      const control = this.fb.control('', [Validators.pattern(/^\d{10}$/)]);
      this.optionalMobileNumbers.push(control);
    }
  }

  removeOptionalMobileNumber(index: number) {
    this.optionalMobileNumbers.removeAt(index);
  }
}
