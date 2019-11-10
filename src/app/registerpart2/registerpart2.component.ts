import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import {Md5} from 'ts-md5/dist/md5';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-registerpart2',
  templateUrl: './registerpart2.component.html',
  styleUrls: ['./registerpart2.component.css']
})
export class Registerpart2Component implements OnInit {


  registerForm: FormGroup;

  hide = true;


  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute,private userservice: UserService,private router: Router) {
    this.registerForm = new FormGroup ({
      otp : new FormControl('', [Validators.required]),
      name : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      conpassword : new FormControl('', [Validators.required]),

    });
   }

  ngOnInit() {

  }

  getErrorMessage() {
    return this.registerForm.get('otp').hasError('required') ? 'You must enter a otp' : '';
  }

  getErrorMessage1() {
    return this.registerForm.get('name').hasError('required') ? 'You must enter your name' : '';
  }

  getErrorMessage2() {
    return this.registerForm.get('password').hasError('required') ? 'You must enter a value' : '';
  }



  signInstead() {
    this.router.navigate(['/login']);
  }


  register() {
    if(this.registerForm.valid){
      if(this.registerForm.get('password').value === this.registerForm.get('conpassword').value) {
        this.registerForm.get('conpassword').setValue(Md5.hashStr(this.registerForm.get('password').value));
        this.registerForm.get('password').setValue(Md5.hashStr(this.registerForm.get('password').value));


        this.userservice.register(this.registerForm.value)
        .subscribe(
          data => {
            if (data['code'] === 200) {
              // alert('Regisration Successful');
              this.snackBar.open('Registration Succesful', '', {
                duration: 5000
              });
              this.router.navigate(['/login']);
            }
            else if (data['code'] === 207) {
              // alert('OTP does not match');
              this.snackBar.open('OTP does not match', '', {
                duration: 5000
              });
              this.registerForm.get('otp').setValue('');
            }
          },
          error => { }
        );
      }
      else {
        alert('passwords does not match');
        this.snackBar.open('Passwords does not match', '', {
          duration: 5000
        });
        this.registerForm.get('password').setValue('');
        this.registerForm.get('conpassword').setValue('');

      }

    }
  }



}
