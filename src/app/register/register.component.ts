import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  otpForm: FormGroup;




  constructor(private snackBar: MatSnackBar,private userservice: UserService,private router: Router) {
    this.otpForm = new FormGroup ({
      email : new FormControl('', [Validators.required, Validators.email])
    })

  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.otpForm.get('email').hasError('required') ? 'You must enter a value' :
    this.otpForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }



  signInstead() {
    this.router.navigate(['/login']);
  }

  check() {
    if(this.otpForm.valid){
      this.userservice.registerOtp(this.otpForm.value)
      .subscribe(
        data => {
          if (data['code'] === 202) {
            // alert('Email already exists');
            this.snackBar.open('Email already exists', '', {
              duration: 5000
            });
            this.otpForm.get('email').setValue("");
          }
          else if (data['code'] == 200) {
            localStorage.setItem('token', JSON.stringify(data));
            this.router.navigate(['/otp']);
          }
        },
        error => { }
      );
    }
  }


}
