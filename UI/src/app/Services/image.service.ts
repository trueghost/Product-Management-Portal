import { Injectable } from '@angular/core';  
import {HttpClient, HttpResponse} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';
@Injectable({  
  providedIn: 'root'  
})  
export class ImageService {  
  Url: string | undefined; 
  
  constructor(private http : HttpClient) { }  

  addImages(model : any){  
    return this.http.post<any>('https://localhost:44354/Api/Image/Data',model);    
   } 

  showImages():Observable<any[]> {  
   return this.http.get<any>('https://localhost:44354/Api/Image/Show');    
  }  

  deleteImages(model : any){  
    return this.http.post<any>('https://localhost:44354/Api/Image/Delete',model);    
   } 
   
   showId():Observable<any[]> {  
    return this.http.get<any>('https://localhost:44354/Api/Image/Product');    
   }  

   readonly DataUrl = "https://localhost:44354/Api/Data";

   showDetails():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/Show');
  }
}