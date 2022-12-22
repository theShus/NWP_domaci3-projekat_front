import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ErrorMessage,
  Machine,
  ScheduleParameters,
} from "../models";
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
    console.log(params)
    return this.httpClient.get<Machine[]>(`${environment.apiMachineServerUrl}/get`,{ headers: this.headers, params: params })
  }

  public getErrorMessagesForUser(mail: string): Observable<ErrorMessage[]>{
    const params = new HttpParams().set('mail',mail)
    console.log(params)
    return this.httpClient.get<ErrorMessage[]>(`${environment.apiMachineServerUrl}/errors`,{ headers: this.headers, params: params })
  }

  public scheduleMachine(scheduleRequest: ScheduleParameters): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiMachineServerUrl}/schedule`,scheduleRequest,{headers: this.headers} );
  }

  public createMachine(name: string, mail: string): Observable<Machine>{//todo fix
    console.log(mail)
    console.log(name)

    let url = new URL(`${environment.apiMachineServerUrl}/create`)
    url.searchParams.append('mail','ljeremic@raf.rs')
    url.searchParams.append('name','newnew')

    const params = new HttpParams()
      .set('id','ljeremic@raf.rs')
      .set('date',"neww")

    return this.httpClient.post<Machine>(`${environment.apiMachineServerUrl}/create`,params ,{ headers: this.headers });
    // return this.httpClient.post<Machine>(`${url}`, { headers: this.headers });
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

  public destroyMachine(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${environment.apiMachineServerUrl}/destroy/${id}`, { headers: this.headers });
  }

  public searchMachines(mail: string, name: string, status: any, dateFrom: any, dateTo: any): Observable<Machine>{
    let url = new URL(`${environment.apiMachineServerUrl}/get_filtered`)
    url.searchParams.append('mail',mail)
    url.searchParams.append('name',name)
    console.log(url)
    if (status != null) url.searchParams.append('status',status)
    if (dateFrom != null) url.searchParams.append('dateFrom',dateFrom)
    if (dateTo != null) url.searchParams.append('dateTo',dateTo)
    return this.httpClient.get<Machine>(`${url}`, { headers: this.headers,  });
  }

}
