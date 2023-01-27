import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, HomePageComponent, HeaderComponent, CarrouselComponent, HttpClientModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
