import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/Services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

  constructor(private http: HttpClient,private router: Router , private service:ImageService) {}

  tolist() {
    if(confirm(`Are you sure you want to go the Search Page?`)) {
    this.router.navigate(['list']);
    setTimeout(() => {
      location.reload();
    }, 1);}
    }

  toadd() {
    if(confirm(`Are you sure you want to go the previous tab?`)) {
    this.router.navigate(['add']);
    setTimeout(() => {
      location.reload();
    }, 1);}
    }

  toimage() {
      this.router.navigate(['image']);
      setTimeout(() => {
        location.reload();
      }, 1);
      }


ngOnInit(): void{
  this.showData();
  this.showId();
  this.showImages();
  this.showName();
}

myForm = new FormGroup({
  image: new FormControl('', Validators.required)
});

@Input() details:any;
ProductId!: number;
ImageName: string="";

imageUrls: any;

  onSelected(event: any) {
    const files: File[] = event.target.files;
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => urls.push(reader.result as string);
      reader.readAsDataURL(files[i]);
    }
    this.imageUrls = urls;
  }

  isFormValid() {
    return this.myForm.valid;
  }

  allImages: any;
  allId: any;
  isFetching: boolean = false;
  editMode: boolean = false;
  currentID!: number; 
  submitted = false;


  showData(){
    this.service.showImages().subscribe((Images) => {  
      this.allImages = Images.map((item) => ({
        ...item,
        status: item.status === 2,
      }));
      this.isFetching = false;
    });
  }    

  showId(){
    this.service.showId().subscribe((Id) => {  
      this.allId = Id 
      this.ProductId = this.allId.join();
    });
  }    

  ImageArray: { ImageName: string , ImageId: number }[] = [];

  showImages() {
    this.service.showImages().subscribe((response: any) => {
      this.ImageArray = response.flatMap((image: any) => {
        const imageNames = image.ImageName.split(',');
        return imageNames.map((imageName: string) => ({
          ImageName: imageName.trim(),
          ImageId: image.ImageId
        }));
      });      
      console.log(this.ImageArray);
    });
  }

  ProductName:any;

  showName(){
    this.service.showDetails().subscribe((res:any) =>{
     this.ProductName = res
    });
  }
  
  

  result:any

  onFileSelected(event: any) {
    const files = event.target.files;
    const fileNames = [];
    for (let file of files) {
      fileNames.push(file.name);
    }
    const myString = fileNames.join(',');
    this.result = myString
  }

  addImages(){
    var data = {
      "ProductId": this.ProductId,
      "ImageName": this.result,
      "ImageUrl":  this.ImageName
    }
    this.service.addImages(data).subscribe();
    alert("Successfully added the images");
    setTimeout(() => {
      location.reload();
    }, 1);
    console.log(data);
  }

  deleteImages(item:any){
    var data = {
      "ImageId": item.ImageId
    }
    if(confirm(`Are you sure you want to delete ${item.ImageName} ?`)) {
    this.service.deleteImages(data).subscribe(); }
    setTimeout(() => {
      location.reload();
    }, 1);
    console.log(item.ImageId);
  }
}
