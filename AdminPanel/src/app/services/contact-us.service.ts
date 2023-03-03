import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  contactShow(obj:any)
{
  console.log(obj)
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}` });
    this.http.post(this.API_URL+'contactUs/showContact',obj, { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });

}

deleteC(id:any)
{
  console.log(id);
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({'Accept': 'application/json', 'Authorization':`Bearer ${this.token}`});
    this.http.get(this.API_URL+`contactUs/delContact/${id}`, { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });
}

getEmail()
{
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
    this.http.get(this.API_URL+'contactUs/getemail', { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });
}


// showEmailData(obj:any){
//   console.log(obj);
//     return new Promise((resolve, reject) => {
//       let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}` });
//       this.http.post(this.API_URL+"contactUs/getemailListedData",obj,{ headers: headers }).toPromise().then((data:any) => {
//           resolve(data);
//       }, error => {
//           reject(error);
//       });
//     });
// }
}
