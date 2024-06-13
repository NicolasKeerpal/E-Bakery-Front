import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { OurProductsComponent } from '../components/our-products/our-products.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ProductComponent } from '../components/product/product.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { AboutUsComponent } from '../components/about-us/about-us.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'our-products', component: OurProductsComponent },
  { path: 'our-products/:id', component: ProductComponent },
  { path: 'ingredients', loadChildren: () => import('./modules/ingredients.module').then(m => m.IngredientsModule) },
  { path: 'profil', component: ProfilComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [noAuthGuard] },
  {path: 'about-us', component: AboutUsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
