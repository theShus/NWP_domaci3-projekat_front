import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MachineSearchParameters, Role} from "../../models";
import {MachineService} from "../../services/machine.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-all-machines',
  templateUrl: './all-machines.component.html',
  styleUrls: ['./all-machines.component.css']
})

export class AllMachinesComponent  implements OnInit, OnDestroy{

  searchForm: FormGroup
  machineSearchParameters: MachineSearchParameters
  router: Router
  someSubscription: any
  machineList: any
  runningStatus:boolean
  stoppedStatus:boolean
  userRoles: Role[]


  constructor(private machineService: MachineService,  router: Router, private formBuilder: FormBuilder) {
    this.router = router
    this.userRoles = []
    this.machineList = []
    this.runningStatus = false
    this.stoppedStatus = false

    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],

    })

    this.machineSearchParameters = {
      name: '',
      dateFrom: null,
      dateTo: null
    }

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

  ngOnDestroy(): void {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllMachinesByUser(localStorage.getItem("userMail")!)
    this.userRoles = JSON.parse(<string>localStorage.getItem("userRoles"))
  }

  getPermission(permission: string): boolean {
    return !!localStorage.getItem("userRoles")?.includes(permission);
  }

  getAllMachinesByUser(mail: string){
    this.machineService.getAll(mail).subscribe(result => {
      result.forEach(machine => {
        if (machine.active) this.machineList.push(machine)
      })
      console.log(result)
    })
  }

  search(){
    let statusString: any
    if (this.runningStatus && this.stoppedStatus) statusString = "RUNNING,STOPPED"
    else if (!this.runningStatus && !this.stoppedStatus) statusString = null
    else {
      statusString = ''
      if (this.runningStatus) statusString = statusString + "RUNNING"
      if (this.stoppedStatus) statusString = statusString + "STOPPED"
    }

    console.log(statusString)

    this.machineService.searchMachines(
      localStorage.getItem("userMail")!,
      this.machineSearchParameters.name,
      statusString,
      this.machineSearchParameters.dateFrom,
      this.machineSearchParameters.dateTo).subscribe(result => {
      this.machineList = result
      console.log(this.machineList)
    })
  }

  scheduleMachine(id: number){

  }

  startMachinee(id: number){//todo mozda da se stavi alert ako je dugme suprotstavlja specifikaciji
    console.log("startujemo " + id)
    this.machineService.startMachine(id).subscribe(result => {
      this.router.navigate(['/machines'])
      console.log(result)
    })
  }

  stopMachine(id: number){
    console.log("stoppujemo " + id)
    this.machineService.stopMachine(id).subscribe(result => {
      this.router.navigate(['/machines'])
      console.log(result)
    })
  }

  restartMachine(id: number){
    console.log("restartujemo " + id)
    this.machineService.restartMachine(id).subscribe(result => {
      this.router.navigate(['/machines'])
      console.log(result)
    })
  }

  destroyMachine(id: number){
    console.log("brisemo " + id)
    this.machineService.destroyMachine(id).subscribe(result => {
      this.router.navigate(['/machines'])
      console.log(result)
    })
  }

  logOut(): void {
    localStorage.setItem("token", '')
    localStorage.setItem("roles", '')
  }

}
