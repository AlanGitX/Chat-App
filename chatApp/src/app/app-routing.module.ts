import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatNamesComponent } from './chat-names/chat-names.component';
import { LoginComponent } from './login/login.component';
import { RegesterComponent } from './regester/regester.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:LoginComponent},
  {path:'register', component:RegesterComponent},
  {path:'chat', component:ChatNamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
