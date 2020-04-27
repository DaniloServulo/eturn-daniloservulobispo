import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class eTurnCep {
  cepApi = 'https://api.postmon.com.br/v1/cep/';
  constructor(private http: HttpClient) { }
  public getCep(cep: any): Observable<any> {
    return this.http.get(this.cepApi + cep);
  }
}
