import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NG_CONFIG_URL_TOKEN, bootConfigServiceProvider } from 'ng-config-service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: NG_CONFIG_URL_TOKEN, useValue: 'assets/config/' + environment.configFile},
    bootConfigServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
