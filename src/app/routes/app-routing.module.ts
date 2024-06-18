import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { OurProductsComponent } from '../components/our-products/our-products.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ProductComponent } from '../components/product/product.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { UpdateProfilComponent } from '../components/update-profil/update-profil.component';
import { CartComponent } from '../components/cart/cart.component';
import { OrdersListComponent } from '../components/orders-list/orders-list.component';
import { BuyScreenComponent } from '../components/buy-screen/buy-screen.component';
import { DeliveryListComponent} from '../components/delivery-list/delivery-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'our-products', component: OurProductsComponent },
  { path: 'our-products/add', component: AddProductComponent },
  { path: 'our-products/:id', component: ProductComponent },
  { path: 'ingredients', loadChildren: () => import('./modules/ingredients.module').then(m => m.IngredientsModule) },
  { path: 'populate-db', loadChildren: () => import('./modules/populate-db.module').then(m => m.PopulateDbModule) },
  { path: 'orders', component: OrdersListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/:id/buy', component: BuyScreenComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },  
  { path: 'profil/edit', component: UpdateProfilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [noAuthGuard] },
  {path: 'about-us', component: AboutUsComponent},
  {path: 'deliveries', component:DeliveryListComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
