import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const url = ' https://googlekeep-backend.herokuapp.com';
// const url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerOtp(body: any) {
    return this.http.post(url + '/registerCheck', body, {
      observe: 'body'
    });
  }


  register(body: any) {
    return this.http.post(url + '/register', body, {
      observe: 'body'
    });
  }

  login(body: any) {
    return this.http.post(url + '/login', body, {
      observe: 'body'
    });
  }


  forgotOtp(body: any) {
    return this.http.post(url + '/passwordCheck', body, {
      observe: 'body'
    });
  }

  changePassword(body: any) {
    return this.http.post(url + '/updatePassword', body, {
      observe: 'body'
    });
  }

  getUsername() {
    let token = localStorage.getItem('token');
    if(token != null) {
      token = token.slice(1, token.length-1);
    }
    return this.http.post(url + '/user',{token}, {
        observe: 'body'
      });
    }
  // getUsername() {
  //   return this.http.get(url + '/username', {
  //      params: new HttpParams().append('token', localStorage.getItem('token'))
  // });
  // }


}
