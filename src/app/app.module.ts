import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PricePipe } from './pipes/price.pipe';
import { ProfilComponent } from './components/profil/profil.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CartComponent } from './components/cart/cart.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExtractTabDataPipe } from './pipes/extract-tab-data.pipe';
import { AboutUsComponent } from './components/about-us/about-us.component';

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
    IngredientsComponent,
    FoodCardComponent,
    NotFoundComponent,
    ExtractTabDataPipe,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
