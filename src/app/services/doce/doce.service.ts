import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doce } from 'src/app/model/doce.model';

@Injectable({
  providedIn: 'root'
})
export class DoceService {

  private _url: string = "https://localhost:44393/api/doces/";

  constructor(private request: HttpClient) { }


  //Create
getAll(): Observable<Doce[]>{  
  return this.request.get<Doce[]>(this._url);  
}

getById(id:number): Observable<Doce>{
  return this.request.get<Doce>(this._url+id);
}

getByParam(descricao: string): Observable<Doce[]>{
  const endpoint: string = this._url+'?descricao='+descricao;
  console.log(endpoint)
  return this.request.get<Doce[]>(endpoint);
}

post(doce: Doce): Observable<Doce> {
  console.log("DoceService.post-start");
  console.log(doce);
  return this.request.post<Doce>(this._url, doce);
} 

put(doce: Doce): Observable<Doce> {
  const endpoint: string = this._url + doce.Id;
  return this.request.put<Doce>(endpoint, doce);
}

delete(id: number): Observable<Doce>{

  return this.request.delete<Doce>(this._url+id);
}



}