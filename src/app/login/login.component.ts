import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  hide = true;

  constructor(private snackBar: MatSnackBar,private userservice: UserService, private router: Router) {
    this.loginForm = new FormGroup ({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])

    });
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
        this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage1() {
    return this.loginForm.get('password').hasError('required') ? 'You must enter a value' : '';
  }

  forgot() {
    if(this.loginForm.get('email').valid){
      this.userservice.forgotOtp(this.loginForm.value)
      .subscribe(
        data => {
          if (data['code'] === 202) {
            // alert('Email not registered');
            this.snackBar.open('Email not registered', '', {
              duration: 5000
            });
            this.loginForm.get('email').setValue('');
          }
          else if(data['code'] === 200) {
            this.router.navigate(['/forgot']);
          }
        },
        error => { }
      );
    }
    else{
      // alert('Please enter your email and then click forgotPassword');
      this.snackBar.open('Please enter your email and then click forgotPassword', '', {
        duration: 5000
      });
    }
  }

  createAccount() {
    this.router.navigate(['/register']);
  }


  login() {
    if(this.loginForm.valid){
      this.loginForm.get('password').setValue(Md5.hashStr(this.loginForm.get('password').value));
      this.userservice.login(this.loginForm.value)
      .subscribe(
        data => {
          if (data['code'] === 400) {
            // alert('Email not registered');
            this.snackBar.open('Email not registered', '', {
              duration: 5000
            });
            this.loginForm.get('email').setValue('');
          }
          else if (data['code'] === 411) {
            // alert('Password is wrong');
            this.snackBar.open('Password is wrong', '', {
              duration: 5000
            });
            this.loginForm.get('password').setValue('');
          }
          else if(data['code'] === 200) {
            localStorage.setItem('token', JSON.stringify(data['token']));
            this.router.navigate(['/inbox']);
          }
        },
        error => { }
      );
    }
  }

}
