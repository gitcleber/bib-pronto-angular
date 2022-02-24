import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caderno } from 'src/app/model/caderno.model';
import { Gibi } from 'src/app/model/gibi';

@Injectable({
  providedIn: 'root'
})
export class GibiService {

  private _url: string = "https://localhost:44393/api/gibis/";

  constructor(private _http: HttpClient) { }

  //create
  post(gibi: Gibi): Observable<Gibi>{
    return this._http.post<Gibi>(this._url,gibi);
  }

  getAll(): Observable<Gibi[]>{
    return this._http.get<Gibi[]>(this._url);
  }
  getById(id:number): Observable<Gibi>{
    return this._http.get<Gibi>(this._url+id);
  }
  getByParam(titulo: string): Observable<Gibi[]>{
    const endpoint: string = this._url+'?titulo='+titulo;
    return this._http.get<Gibi[]>(endpoint);
  }

  put(gibi: Gibi): Observable<Gibi>{
    return this._http.put<Gibi>(this._url+gibi.Id, gibi)
  }

  delete(id: number): Observable<Gibi>{
    return this._http.delete<Gibi>(this._url+id)
  }









}
