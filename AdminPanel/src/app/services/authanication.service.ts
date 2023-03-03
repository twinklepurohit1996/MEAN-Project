import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthanicationService {
 
  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  //Register Service of user
  register(obj:any){
    return new Promise((resolve, reject) => {
      console.log(obj);
      let headers = new HttpHeaders({'Authorization':`Bearer ${this.token}`});
      this.http.post(this.API_URL+'register', obj).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  registerout(obj:any){
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
  //login Serviece of User
  log(obj:any){
    return new Promise((resolve, reject) => {
      console.log(obj)
      let headers = new HttpHeaders({ 'Accept': 'application/json' });
      this.http.post(this.API_URL+'login', obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  EditU(id:any)
  {
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+`editUser/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  updateU(obj:any,id:any){
    return new Promise((resolve, reject) => {
      const a = {"name":"hello"}
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.post(this.API_URL+`updateUser/${id}`, obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
  
    //Delete Service of User Table
    deleteU(id:any){
      console.log(id);
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Accept': 'application/json', 'Authorization':`Bearer ${this.token}`});
        this.http.get(this.API_URL+`delUser/${id}`, { headers: headers }).toPromise().then((data:any) => {
            resolve(data);
        }, error => {
            reject(error);
        });
      });
    }
 


user()
{
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
    this.http.get(this.API_URL+'show', { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });
}



}
