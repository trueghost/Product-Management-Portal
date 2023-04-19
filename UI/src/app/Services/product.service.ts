import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly DataUrl = "https://localhost:44354/Api/Data";

  constructor(private http:HttpClient) { }

  addDetails(data:any) {
    return this.http.post(this.DataUrl + '/Add', data);
  }
  showDetails():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/Show');
  }
  
  updateDetails(data:any) {
    return this.http.put(this.DataUrl + `/Update`, data).subscribe();
  }

  statusChange(data:any) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.DataUrl + '/Status' ,data);
  }
  
  

  showCategory():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowCategory');
  }

  showSubCategory():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowSubCategory');
  }
  
}