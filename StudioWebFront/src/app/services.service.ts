import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, input } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
  postCustomer(data: any) {
    return this.http.post<any>("https://localhost:81/api/Customer/Create", data)
  }
}

