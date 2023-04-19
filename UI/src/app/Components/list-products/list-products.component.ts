import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {

  constructor(private http: HttpClient,private router: Router , private service:SearchService) {}

  allProducts: any;
  isFetching: boolean = false;
  editMode: boolean = false;
  currentID!: number; 

  categoryDetails$!: Observable<any[]>;
  subcategoryDetails$!: Observable<any[]>;
  categoryDetails:any=[];
  subcategoryDetails:any=[];

  categoryDetailsMap:Map<number, string> = new Map()
  subcategoryDetailsMap:Map<number, string> = new Map()
  model : any={}; 


  tolist() {
    this.router.navigate(['list']);
    setTimeout(() => {
      location.reload();
    }, 1);
    }

  toadd() {
    this.router.navigate(['add']);
    setTimeout(() => {
      location.reload();
    }, 1);
    }


    showData(){
      this.service.showdata().subscribe((products) => {  
        this.allProducts = products.map((item) => ({
          ...item,
          Status: item.Status === 2,
        }));
        this.isFetching = false;
      });
    }  
    
    onToggle(item:any){
      let body = {
        ProductId: item.ProductId,
        Status: item.Status ? 2 : 1,
      }
      this.service.statusChange(body).subscribe();
    }


  searchData(){
      this.service.search(this.model).subscribe((res: any) => {  
        this.allProducts=res.map((item:any) => ({
          ...item,
          status: item.status === 2,
        }));  
    console.log(this.allProducts);  }) 
     }
  
  ngOnInit(): void{
  this.categoryDetails$ = this.service.showCategory();
  this.subcategoryDetails$ = this.service.showSubCategory();
  this.refreshcountryDetailsMap();
  this.refreshstateDetailsMap();
  this.showData();
      }


refreshcountryDetailsMap(){
  this.service.showCategory().subscribe(data =>{
  this.categoryDetails = data;
          
   for(let i=0; i< data.length; i++)
     {
       this.categoryDetailsMap.set(this.categoryDetails[i].CategoryId,this.categoryDetails[i].
         CategoryName);
     }
        })
      }
      
  refreshstateDetailsMap(){
   this.service.showSubCategory().subscribe(data =>{
  this.subcategoryDetails = data;
      
   for(let i=0; i< data.length; i++)
     {
   this.subcategoryDetailsMap.set(this.subcategoryDetails[i].SubCategoryId,this.subcategoryDetails[i].
              SubCategoryName);
    }
     })
    }
}
