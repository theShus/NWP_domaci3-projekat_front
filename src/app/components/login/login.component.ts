import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {UserLoginInfo} from "../../models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup
  userLoginInfo: UserLoginInfo

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router:Router) {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      pass:['', Validators.required]
    })
    this.userLoginInfo = {
      mail: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  login(): void{
    this.userLoginInfo = {
      mail: this.loginForm.get('email')?.value,
      password: this.loginForm.get("pass")?.value
    }

    this.loginService.loginUser(this.userLoginInfo).subscribe(loginResponse =>{
      localStorage.setItem("token", loginResponse.jwt);
      localStorage.setItem("userRoles",  JSON.stringify(loginResponse.roles))

      if (loginResponse.roles.length == 0) alert("You have no roles")
      else this.router.navigate(["all"]);

      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("userRoles"))
    })
  }

}
