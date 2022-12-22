import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Machine} from "../../models";
import {MachineService} from "../../services/machine.service";
import {LoginComponent} from "../login/login.component";
import {logCumulativeDurations} from "@angular-devkit/build-angular/src/builders/browser-esbuild/profiling";

@Component({
  selector: 'app-all-machines',
  templateUrl: './all-machines.component.html',
  styleUrls: ['./all-machines.component.css']
})

export class AllMachinesComponent  implements OnInit, OnDestroy{

  router: Router
  someSubscription: any;
  machineList: Machine[]

  constructor(private machineService: MachineService,  router: Router) {
    this.router = router
    this.machineList = []

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
  }

  getAllMachinesByUser(mail: string){
    this.machineService.getAll(mail).subscribe(result => {
      result.forEach(machine => {
        if (machine.active) this.machineList.push(machine)
      })
    })
  }

  startMachinee(id: number){
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
      console.log(result)    })
  }

}
