import { Injectable } from '@angular/core';  
import {HttpClient, HttpResponse} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';
@Injectable({  
  providedIn: 'root'  
})  
export class SearchService {  
  Url: string | undefined; 
  
  constructor(private http : HttpClient) { }  

  readonly DataUrl = "https://localhost:44354/Api/Data";


  search(model : any){  
    return this.http.post<any>('https://localhost:44354/Api/Search/Data',model);    
   } 

  showdata():Observable<any[]> {  
   return this.http.get<any>('https://localhost:44354/Api/Search/Show');    
  }  


  showCategory():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowCategory');
  }

  showSubCategory():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowSubCategory');
  }

  statusChange(data:any) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.DataUrl + '/Status' ,data);
  }

}