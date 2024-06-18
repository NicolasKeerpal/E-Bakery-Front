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
import { AuthByRoleGuard } from './guards/auth-by-role.guard';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { UpdateProfilComponent } from '../components/update-profil/update-profil.component';
import { CartComponent } from '../components/cart/cart.component';
import { OrdersListComponent } from '../components/orders-list/orders-list.component';
import { BuyScreenComponent } from '../components/buy-screen/buy-screen.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'our-products', component: OurProductsComponent },
  { path: 'our-products/add', component: AddProductComponent , canActivate: [AuthByRoleGuard], data: { roles: ['admin'] } },
  { path: 'our-products/:id', component: ProductComponent },
  { path: 'ingredients', loadChildren: () => import('./modules/ingredients.module').then(m => m.IngredientsModule) , canActivate: [AuthByRoleGuard], data: { roles: ['admin'] }},
  { path: 'populate-db', loadChildren: () => import('./modules/populate-db.module').then(m => m.PopulateDbModule) , canActivate: [AuthByRoleGuard], data: { roles: ['admin'] } },
  { path: 'orders', component: OrdersListComponent , canActivate: [AuthByRoleGuard], data: { roles: ['customer'] } },
  { path: 'cart', component: CartComponent , canActivate: [AuthByRoleGuard], data: { roles: ['customer'] } },
  { path: 'cart/:id/buy', component: BuyScreenComponent , canActivate: [AuthByRoleGuard], data: { roles: ['customer'] } },
  { path: 'deliveries', loadChildren: () => import('./modules/deliveries.module').then(m => m.DeliveriesModule) , canActivate: [AuthByRoleGuard], data: { roles: ['deliveryman'] } },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },  
  { path: 'profil/edit', component: UpdateProfilComponent, canActivate: [AuthGuard] },
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
