import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PricePipe } from './pipes/price.pipe';
import { ProfilComponent } from './components/profil/profil.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CartComponent } from './components/cart/cart.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { ExtractTabDataPipe } from './pipes/extract-tab-data.pipe';
import { ProductComponent } from './components/product/product.component';
import { ErrorLoggingInterceptor } from './interceptors/error-login.interceptor';
import { ErrorCustomerInterceptor } from './interceptors/error-customer.interceptor';
import { IngredientInterceptor } from './interceptors/ingredient.interceptor';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    PricePipe,
    ProfilComponent,
    OurProductsComponent,
    CartComponent,
    FoodCardComponent,
    ExtractTabDataPipe,
    AboutUsComponent,
    ProductComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCustomerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: IngredientInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
