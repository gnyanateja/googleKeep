import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import {Md5} from 'ts-md5/dist/md5';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-forgot-otp',
  templateUrl: './forgot-otp.component.html',
  styleUrls: ['./forgot-otp.component.css']
})
export class ForgotOtpComponent implements OnInit {


  forgotForm: FormGroup;

  hide = true;


  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private userservice: UserService,private router: Router) {
    this.forgotForm = new FormGroup ({
      otp : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      conpassword : new FormControl('', [Validators.required]),

    });
   }

  ngOnInit() {

  }

  getErrorMessage() {
    return this.forgotForm.get('otp').hasError('required') ? 'You must enter a otp' : '';
  }

  getErrorMessage2() {
    return this.forgotForm.get('password').hasError('required') ? 'You must enter a value' : '';
  }



  signInstead() {
    this.router.navigate(['/login']);
  }


  register() {
    if(this.forgotForm.valid){
      if(this.forgotForm.get('password').value === this.forgotForm.get('conpassword').value) {
        this.forgotForm.get('conpassword').setValue(Md5.hashStr(this.forgotForm.get('password').value));
        this.forgotForm.get('password').setValue(Md5.hashStr(this.forgotForm.get('password').value));


        this.userservice.changePassword(this.forgotForm.value)
        .subscribe(
          data => {
            if (data['code'] === 200) {
              // alert('Password Change Successful');
              this.snackBar.open('Password Change Successful', '', {
                duration: 5000
              });
              this.router.navigate(['/login']);
            }
            else if (data['code'] === 207) {
              // alert('OTP does not match');
              this.snackBar.open('OTP does not match', '', {
                duration: 5000
              });
              this.forgotForm.get('otp').setValue('');
            }
          },
          error => { }
        );
      }
      else {
        // alert('passwords does not match');
        this.snackBar.open('passwords does not match', '', {
          duration: 5000
        });
        this.forgotForm.get('password').setValue('');
        this.forgotForm.get('conpassword').setValue('');

      }

    }


}

}
