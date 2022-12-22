import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AllMachinesComponent } from './components/all-machines/all-machines.component';
import { CreateMachineComponent } from './components/create-machine/create-machine.component';
import { ErrorHostoryComponent } from './components/error-hostory/error-hostory.component';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    AllMachinesComponent,
    CreateMachineComponent,
    ErrorHostoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
