import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  API_URL:string =  "http://localhost:5000/";
  token=localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  feedbackInsert(obj:any){
    return new Promise((resolve, reject) => {
      // console.log(obj);
      // console.log("id"+id);
      let headers = new HttpHeaders({'Accept': 'application/json' ,'Authorization':`Bearer ${this.token}`});
      this.http.post(this.API_URL+`feedback/feedbackInsert`, obj).toPromise().then((data:any) => {
          resolve(data);
      }, error => {
          reject(error);
      });
    });
}
showB(){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Accept': 'application/json' });
    this.http.get(this.API_URL+'feedback/showB', { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });
}

fetchSingleFeedback(id:any){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Accept': 'application/json'});
    this.http.get(this.API_URL+`feedback/showSingleFeedbackFront/${id}`, { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });
}

feedbackData(){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Accept': 'application/json' });
    this.http.get(this.API_URL+'feedback/showfeedbackFront', { headers: headers }).toPromise().then((data:any) => {
        resolve(data);
    }, error => {
        reject(error);
    });
  });
}
}
