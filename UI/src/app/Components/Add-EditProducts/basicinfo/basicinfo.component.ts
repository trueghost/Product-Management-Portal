import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css']
})
export class BasicinfoComponent {

  constructor(private http: HttpClient,private router: Router , private service:ProductService , private route: ActivatedRoute) {
    this.generateCode();
  }

  @ViewChild('accordionItem', {static: true}) accordionItem!: ElementRef;
  @ViewChild('productsForm') form!: NgForm;
  @ViewChild('button') button!: ElementRef;
  @ViewChild('myInput', {static: false}) myInput!: ElementRef;

  
  scrollToAccordionItem() {
    this.accordionItem.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  allProducts: any;
  isFetching: boolean = false;
  editMode: boolean = false;
  currentID!: number; 
  formValid = false;
  apiSuccess = false;
  submitted = false;

  categoryDetails$!: Observable<any[]>;
  subcategoryDetails$!: Observable<any[]>;
  categoryDetails:any=[];
  subcategoryDetails:any=[];

  categoryList$!:Observable<any[]>;
  subcategoryList$!:Observable<any[]>;

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

  toimage() {
    this.router.navigate(['image']);
    setTimeout(() => {
      location.reload();
    }, 1);
    }

  ngOnInit(): void{
    this.categoryList$ = this.service.showCategory();
    this.subcategoryList$ = this.service.showSubCategory();
    this.categoryDetails$ = this.service.showCategory();
    this.subcategoryDetails$ = this.service.showSubCategory();
    this.refreshcountryDetailsMap();
    this.refreshstateDetailsMap();
    this.showData();
    this.toFill();
    }

    myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      unc: new FormControl('', Validators.required),
      dropdown1: new FormControl('', Validators.required),
      dropdown2: new FormControl('', Validators.required),
      sho: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });


    @Input() product:any;
    ProductId!: number;
    Title: string= "";
    UniqueCode: string= "";
    CategoryId!: number;
    SubCategoryId!: number;
    ShortDescription: string= "";
    Description: string= "";
    Status!: number;  


  showData(){
      this.service.showDetails().subscribe((products) => {  
        this.allProducts = products.map((item) => ({
          ...item,
          Status: item.Status === 2,
        }));
        this.isFetching = false;
      });
    }    

    toFill(){
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const ProductId = params.get('ProductId');
      const myNumber = Number(ProductId.trim());
      this.currentID = myNumber;
      this.service.showDetails().subscribe((result) => {
      let currentProduct = result.find((p: { ProductId: number; }) => { return p.ProductId === myNumber});
      console.log('currentProduct:', currentProduct);
    this.myForm.setValue({
      title: currentProduct.Title,
      unc: currentProduct.Uniquecode,
      dropdown1 : currentProduct.CategoryId,
      dropdown2 : currentProduct.SubCategoryId,
      sho : currentProduct.ShortDescription,
      desc : currentProduct.Description
    });
    this.editMode = true;
    this.myInput.nativeElement.disabled = true;
    window.scrollTo(0, 0);
    this.button.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
    });
    }



    onToggle(item:any){
      let body = {
        ProductId: item.ProductId,
        Status: item.Status ? 2 : 1,
      }
      this.service.statusChange(body).subscribe();
    }

  codeLength = 8;
  codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  usedCodes: string[] = [];
  randomCode = '';


  generateCode() {
    let code = '';
    for (let i = 0; i < this.codeLength; i++) {
      code += this.codeChars.charAt(Math.floor(Math.random() * this.codeChars.length));
    }
    if (this.usedCodes.indexOf(code) === -1) {
      this.randomCode = code;
      this.usedCodes.push(code);
    } else {
      this.generateCode();
    }
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

  addDetails(data:any){
    if(!this.editMode){

    if (this.myForm.valid) {
    
    var details = {
    "Title" : this.Title,
    "UniqueCode" : this.randomCode,
    "CategoryId" : this.CategoryId,
    "SubCategoryId" : this.SubCategoryId,
    "ShortDescription" : this.ShortDescription,
    "Description" : this.Description
  }
  this.service.addDetails(details).subscribe(
    response => {
      this.apiSuccess = true;
      alert("Data Added Successfully");
      this.router.navigate(['image']);
    },
    error => {
      this.apiSuccess = false;
      alert("Failed To Add Data");
    }
  );
}
else {
  this.apiSuccess = false;
}

this.formValid = this.myForm.valid;
}
  
else{
    var detailse = {
      "ProductId" : this.currentID,
      "Title" : this.Title,
      "UniqueCode" : this.randomCode,
      "CategoryId" : this.CategoryId,
      "SubCategoryId" : this.SubCategoryId,
      "ShortDescription" : this.ShortDescription,
      "Description" : this.Description
    }
    this.service.updateDetails(detailse);
    alert("Data Updated Successfully");
    setTimeout(() => {
      location.reload();
    }, 1);
    this.router.navigate(['add']);
  }
   
  }

  updateProduct(ProductId:number){
    this.myInput.nativeElement.disabled = true;
    this.currentID = ProductId;
    let currentProduct = this.allProducts.find((p: { ProductId: number; }) => { return p.ProductId === ProductId});
  
    this.myForm.setValue({
      title: currentProduct.Title,
      unc: currentProduct.Uniquecode,
      dropdown1 : currentProduct.CategoryId,
      dropdown2 : currentProduct.SubCategoryId,
      sho : currentProduct.ShortDescription,
      desc : currentProduct.Description
    });
  
    this.editMode = true;
    window.scrollTo(0, 0);
    this.button.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  isFormValid() {
    return this.myForm.valid;
  }

  isUncValid(){
    return !this.allProducts || !this.allProducts.some((item: { Uniquecode: string; }) => item.Uniquecode === this.randomCode) || this.editMode;
  }

}
