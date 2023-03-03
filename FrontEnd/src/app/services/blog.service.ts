import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  blogData(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+'blog/showblogFront', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  fetchSingleBlog(id:any){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json'});
      this.http.get(this.API_URL+`blog/showSingleBlogFront/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
}
