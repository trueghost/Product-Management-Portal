import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicinfoComponent } from './Components/Add-EditProducts/basicinfo/basicinfo.component';
import { ImageComponent } from './Components/Add-EditProducts/image/image.component';
import { HomeGuard } from './Components/list-products/home.guard';
import { ListProductsComponent } from './Components/list-products/list-products.component';

const routes: Routes = [
  { path:'list', component: ListProductsComponent , pathMatch: 'full'  },
  { path: '', component: ListProductsComponent, pathMatch: 'full', canActivate: [HomeGuard] },
  {path:'add',component: BasicinfoComponent},
  {path:'edit/:ProductId',component: BasicinfoComponent},
  {path:'image',component: ImageComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
