import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Caderno } from 'src/app/model/caderno.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CadernoService {

  private _url: string = "https://localhost:44393/api/cadernos/";

  constructor(private _http: HttpClient) {
    // console.log("CadernoService.construtor");
  }

  //Create
  post(caderno: Caderno): Observable<Caderno> {
    // console.log("CadernoService.Save");
    //const endpoint: string = "https://localhost:44393/api/cadernos/";

    return this._http.post<Caderno>(this._url, caderno);
  }

  //Read
  getAll(): Observable<Caderno[]> {
    //  console.log("CadernoService.getAll");
    //const endpoint: string = "https://localhost:44393/api/cadernos/";
    return this._http.get<Caderno[]>(this._url);
  }
  getById(id: number): Observable<Caderno> {
    // endpoint "https://localhost:44393/api/cadernos/" +id;
    // return this.request.get<Caderno>(endpoint);
    return this._http.get<Caderno>(this._url + id);
  }

  getByParam(titulo: string): Observable<Caderno[]> {
    const endpoint: string = this._url + '?titulo=' + titulo;
    return this._http.get<Caderno[]>(endpoint);
  }

  //Update
  put(caderno: Caderno): Observable<Caderno> {
    //const endpoint: string = "https://localhost:44393/api/cadernos/" + caderno.Id;
    return this._http.put<Caderno>(this._url+caderno.Id, caderno);

  }

  //Delete
  delete(id: number): Observable<Caderno> {
    //const endpoint: string = "https://localhost:44393/api/cadernos/" + id;
    return this._http.delete<Caderno>(this._url+id);
  }

  //   //teste converter um objetoObservable para array
  //   private extractData(res: Response) {
  //     let body = res.json();
  //     return body.data || {};
  // }

}
