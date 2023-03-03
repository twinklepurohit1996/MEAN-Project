import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  //login Serviece of User
  login(obj:any){
    return new Promise((resolve, reject) => {
      console.log(obj)
      let headers = new HttpHeaders({ 'Accept': 'application/json' });
      this.http.post(this.API_URL+'loginFront', obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
  register(obj:any){
    return new Promise((resolve, reject) => {
      console.log(obj);
      let headers = new HttpHeaders({'Accept': 'application/json'});
      this.http.post(this.API_URL+'register', obj).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  userData(id:any)
  {
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+`userInfo/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
}
