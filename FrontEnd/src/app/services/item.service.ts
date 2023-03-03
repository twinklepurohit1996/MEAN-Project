import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  
  getItem(id:any){
      return new Promise((resolve, reject) => {
        console.log(id);
        let headers = new HttpHeaders({ 'Accept': 'application/json'});
        this.http.get(this.API_URL+`item/getData/${id}`, { headers: headers }).toPromise().then((data:any) => {
            resolve(data);
        }, error => {
            reject(error);
        });
      });
  }
}
