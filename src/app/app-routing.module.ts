import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import {AppComponent} from "./components/app/app.component";
import {AllUsersComponent} from "./components/all-users/all-users.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {LoginGuard} from "./guards/login.guard";
import {AllGuard} from "./guards/all.guard";
import {AddGuard} from "./guards/add.guard";
import {EditGuard} from "./guards/edit.guard";
import {AllMachinesComponent} from "./components/all-machines/all-machines.component";


const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canDeactivate: [LoginGuard]
  },
  {
    path: "machines",
    component: AllMachinesComponent
    // canDeactivate: [LoginGuard]
  },
  {
    path: "all",
    component: AllUsersComponent,
    canActivate: [AllGuard]
  },
  {
    path: "add",
    component: AddUserComponent,
    canActivate: [AddGuard]
  },
  {
    path: "edit/:id",
    component: EditUserComponent,
    canActivate: [EditGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
