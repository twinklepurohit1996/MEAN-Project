import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  showCate(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Accept': 'application/json'});
      this.http.get(this.API_URL+'cate/showCateFront', { headers: headers }).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
  }
}
