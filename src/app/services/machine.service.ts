import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Machine, User} from "../models";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private headers

  constructor(private httpClient: HttpClient){
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }

  public getAll(mail: string): Observable<Machine[]>{
    const params = new HttpParams().set('mail',mail)
    return this.httpClient.get<Machine[]>(`${environment.apiMachineServerUrl}/get`,{ headers: this.headers, params: params })
  }

  public startMachine(id: number): Observable<Machine>{
    return this.httpClient.get<Machine>(`${environment.apiMachineServerUrl}/start/${id}`, { headers: this.headers });
  }

  public stopMachine(id: number): Observable<Machine>{
    return this.httpClient.get<Machine>(`${environment.apiMachineServerUrl}/stop/${id}`, { headers: this.headers });
  }

  public restartMachine(id: number): Observable<Machine>{
    return this.httpClient.get<Machine>(`${environment.apiMachineServerUrl}/restart/${id}`, { headers: this.headers });
  }

  public destroyMachine(id: number): Observable<Machine>{
    return this.httpClient.delete<Machine>(`${environment.apiMachineServerUrl}/destroy/${id}`, { headers: this.headers });
  }

}
