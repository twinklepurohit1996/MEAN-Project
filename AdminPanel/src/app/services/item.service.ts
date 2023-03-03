import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  //Show Serveice of Item
  showI(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+'item/showI', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Show Dropdown of Categories in Item form
  item(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+'item/item', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }


  //Delete Service of Item Table
  deleteI(id:any){
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}`});
      this.http.get(this.API_URL+`item/delItem/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Insert Item of Item
  itemInsert(obj:any){
    console.log(obj);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Authorization':`Bearer ${this.token}`});
      this.http.post(this.API_URL+'item/insertItem',obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Edit Service of Item Table
  EditI(id:any){
    console.log(id);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({'Authorization':`Bearer ${this.token}` });
      this.http.get(this.API_URL+`item/editItem/${id}`, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }

  //Update Service of Categories
  updateI(obj:any,id:any){
    console.log("id"+id);
    return new Promise((resolve, reject) => {
      console.log(id)
      let headers = new HttpHeaders({ 'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}`});
      this.http.post(this.API_URL+`item/updateItem/${id}`, obj, { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
}
