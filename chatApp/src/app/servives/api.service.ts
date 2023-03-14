import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  register(pno: any, pswd: any, uname: any, photo: any) {
    const body = {
      pno,
      pswd,
      uname,
      photo,
    };
    //api call.

    return this.http.post('http://localhost:3000/register', body);
  }

  login(pno: any, pswd: any) {
    const body = {
      pno,
      pswd,
    };

    return this.http.post('http://localhost:3000/login', body);
  }

  appendToken() {
    //fetch token from local storage.
    const token = localStorage.getItem('token') || ' ';

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('access-token', token);
      options.headers = headers;
    }
    return options;
  }

  getContacts(){
    return  this.http.get('http://localhost:3000/all-contacts',this.appendToken())

  }

  getChat(phn:any){
    const body = {
      phn
    }
    return  this.http.post('http://localhost:3000/getChat',body,this.appendToken())

  }
  updateChat(msg:any,toPhn:any,fromPh:any,dir:any){
    const body = {
      msg,
      toPhn,
      fromPh,
      dir
      
    }
    return  this.http.post('http://localhost:3000/msg-update',body,this.appendToken() )

  }
}
