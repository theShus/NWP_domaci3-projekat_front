import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Role, User} from "../../models";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy{

  userList: User[]
  userRoles: Role[]
  canUpdate: boolean = false
  router: Router
  someSubscription: any;

  constructor(private userService: UserService,  router: Router) {
    this.userList = []
    this.userRoles = []

    if(localStorage.getItem("userRoles")?.includes("can_update_users"))//todo pogledaj ovo
      this.canUpdate = true
    this.router = router

    //https://medium.com/beingcoders/angular-basics-refresh-an-angular-component-without-reloading-the-same-component-b6c513f06fb2
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.someSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    })
  }

  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getAllUsers()
    this.userRoles = JSON.parse(<string>localStorage.getItem("userRoles"))
  }

  getAllUsers(): void{
    this.userService.getAll().subscribe(result => {
      this.userList = result
    })
  }

  getPermission(permission: string): boolean {
    return !!localStorage.getItem("userRoles")?.includes(permission);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(result => {
      this.router.navigate(['/all'])
      console.log(result)
    })
    this.userService.getAll().subscribe(result => {
      this.userList = result
    })
  }

  logOut(): void {
    localStorage.setItem("token", '')
    localStorage.setItem("roles", '')
  }

}
