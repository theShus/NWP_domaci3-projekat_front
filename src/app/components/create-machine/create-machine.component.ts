import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MachineService} from "../../services/machine.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent  implements OnInit{

  name: string
  createMachineForm: FormGroup

  constructor(private machineService: MachineService, private formBuilder: FormBuilder, private router: Router) {
    this.name = ""
    this.createMachineForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {//todo porpavi ovaj kurac
  }

  createMachine(){
    this.machineService.createMachine(this.name, localStorage.getItem("userMail")!).subscribe(result => {
      this.router.navigate(['/machines'])
      console.log(result)
    })
  }

}
