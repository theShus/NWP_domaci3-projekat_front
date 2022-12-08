import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{

  userList: User[]

  constructor(private userService: UserService) {
    this.userList = []
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void{
    this.userService.getAll().subscribe(result => {
      this.userList = result
    })
  }

}
