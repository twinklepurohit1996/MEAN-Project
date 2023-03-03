import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService  {
  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  //Insert Service of Categories
  cate(obj:any){
    return new Promise((resolve, reject) => {
      console.log(obj)
      let headers = new HttpHeaders({ 'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}` });
      this.http.post(this.API_URL+'cate/insertCate', obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Show Serveice of Categories
  showC(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+'cate/showC', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Delete Service of Categories Table
  deleteC(id:any){
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}`});
      this.http.get(this.API_URL+`cate/delCate/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Edit Service of Categories Table
  EditC(id:any){
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+`cate/editCate/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Update Service of Categories
  updateC(obj:any,id:any){
    console.log("id"+id);
    return new Promise((resolve, reject) => {
      console.log(id)
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.post(this.API_URL+`cate/updateCate/${id}`, obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
  
  
}
