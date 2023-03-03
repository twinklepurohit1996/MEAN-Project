import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  blogadd(obj:any){
    return new Promise((resolve, reject) => {
      console.log(obj);
      let headers = new HttpHeaders({'Authorization':`Bearer ${this.token}`});
      this.http.post(this.API_URL+'blog/addblog', obj).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
  blogShow()
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+'blog/showBlog', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
  
  updateB(obj:any,id:any){
    return new Promise((resolve, reject) => {
      const a = {"name":"hello"}
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.post(this.API_URL+`blog/updateBlog/${id}`, obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
  
  EditB(id:any)
  {
    console.log(id);
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}` });
        this.http.get(this.API_URL+`blog/editBlog/${id}`, { headers: headers }).toPromise().then((data:any) => {
            resolve(data);
        }, error => {
            reject(error);
        });
      });
  }
  deleteB(id:any)
  {
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({'Accept': 'application/json', 'Authorization':`Bearer ${this.token}`});
      this.http.get(this.API_URL+`blog/delBlog/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
}
