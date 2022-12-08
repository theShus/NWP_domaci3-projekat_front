import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import {AppComponent} from "./components/app/app.component";
import {AllUsersComponent} from "./components/all-users/all-users.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "all",
    component: AllUsersComponent
  },
  {
    path: "add",
    component: AddUserComponent
  },
  {
    path: "edit/:id",
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
