import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  // (id:any)
  // {
  //   console.log(id);
  //   return new Promise((resolve, reject) => {
  //     let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}` });
  //     this.http.get(this.API_URL+`editUser/${id}`, { headers: headers }).toPromise().then((data:any) => {
  //         resolve(data);
  //     }, error => {
  //         reject(error);
  //     });
  //   });
  // }
   showF(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+'feedback/showF', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Delete Service of Item Table
  deleteF(id:any){
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}`});
      this.http.get(this.API_URL+`feedback/delFeedback/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  active(id:any,obj:any){
    // console.log('Service front')
    // console.log(id);
    // console.log(obj);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}`});
      this.http.post(this.API_URL+`feedback/active/${id}`,obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
}
