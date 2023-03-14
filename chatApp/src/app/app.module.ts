import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChatNamesComponent } from './chat-names/chat-names.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegesterComponent } from './regester/regester.component';
import{HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Header2Component } from './header2/header2.component';
import { FilterPipe } from './pipes/filter.pipe'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatNamesComponent,
    ChatDetailsComponent,
    LoginComponent,
    RegesterComponent,
    Header2Component,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
