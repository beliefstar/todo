import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRouting } from './app.routing';
import { AppService } from './app.service';
import { LoginedService } from './Logined.service';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { TodoesComponent } from './todoes/todoes.component';
import { LoginComponent } from './login/login.component';
import {RouteStateService} from './route-state.service';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    TodoesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouting
  ],
  providers: [
    AppService,
    RouteStateService,
    LoginedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
