import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private router: Router) {
  }

  get(url, token) {
    let obs = this.http.get('http://fundoonotes.incubation.bridgelabz.com/api/' + url, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
    return obs;
  }
  get1(url) {
    let obs = this.http.get('http://fundoonotes.incubation.bridgelabz.com/api/'+ url)
    return obs;
  }
  post(url, data) {
    let obs = this.http.post('http://fundoonotes.incubation.bridgelabz.com/api/' + url, data)
    return obs;
  }

  postWithToken(url, data, token) {
    let obs = this.http.post('http://fundoonotes.incubation.bridgelabz.com/api/' + url, data, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
    return obs;
  }
  delete(url, token) {
    let obs = this.http.delete('http://fundoonotes.incubation.bridgelabz.com/api/' + url, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
    return obs;
  }
}













//   private REST_API_SERVER = "http://fundoonotes.incubation.bridgelabz.com/api/user/";
//   
//  signUp(data:any){
//    let obs = this.http.post(this.REST_API_SERVER,data);
//    obs.subscribe(()=>{
//      console.log("signup request accessed!!");
//    })
//  }
//  logIn(data:any){
//   var obs=this.http.post('http://fundoonotes.incubation.bridgelabz.com/api/user/login',data);
//   return obs;
//  }
// }
