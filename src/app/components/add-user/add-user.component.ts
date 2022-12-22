import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewUser, Role} from "../../models";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{

  updateForm: FormGroup
  userInfo: NewUser
  readRole: boolean
  createRole: boolean
  updateRole: boolean
  deleteRole: boolean


  serverRoles: Role[]
  userRoles: Role[]


  constructor(private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })
    this.userInfo = {
      id: 0,
      name: '',
      lastName: '',
      password: '',
      mail: '',
      roles: []
    }
    this.serverRoles = []
    this.userRoles = []
    this.readRole = false
    this.createRole = false
    this.updateRole = false
    this.deleteRole = false
  }

  ngOnInit(): void {
    this.getServerRoles()
  }

  addUser(): void{
    if (this.readRole) this.addRoles('can_read_users')
    if (this.createRole) this.addRoles('can_create_users')
    if (this.updateRole) this.addRoles('can_update_users')
    if (this.deleteRole) this.addRoles('can_delete_users')

    this.userService.addUser(this.userInfo).subscribe(result => {
      console.log(result)
    })
    this.readRole = false
    this.createRole = false
    this.updateRole = false
    this.deleteRole = false
    this.userInfo.roles = []
  }

  addRoles(name: string): void{
    this.serverRoles.forEach(role => {
      if (role.name.includes(name)){
        this.userInfo.roles.push(role)
      }
    })
  }

  getServerRoles(): void{
    this.userService.getRoles().subscribe(result => {
      this.serverRoles = result
    })
  }

}
