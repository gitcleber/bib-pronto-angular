import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Caderno } from 'src/app/model/caderno.model';
import { CadernoService } from 'src/app/services/caderno/caderno.service';

@Component({
  selector: 'app-caderno-index',
  templateUrl: './caderno-index.component.html',
  styleUrls: ['./caderno-index.component.css']
})
export class CadernoIndexComponent implements OnInit {
  cadernos: Caderno[];
  searchTitulo: string = '';
  searchId: string = '';

  constructor(private router: Router, private cadernoService: CadernoService) {
    // console.log("CadernoIndexComponent.contructor");
    this.cadernos = new Array<Caderno>();
  }

  ngOnInit(): void {
     console.log("CadernoIndexComponent.ngOnInit");
    //this.goToListar();
    
  }
  goToCreate(): void {//Create
    // document.location="caderno-create";
    this.router.navigateByUrl("cadernos/caderno-create");
  }
  goToListar() {
    this.goToClearList();
    if (this.searchId !== ''){
      console.log("byID");
      return this.goToReadById(Number(this.searchId));      
    }
    else if (this.searchTitulo !== ""){
    console.log("Titulo");
      // this.goToParam(this.searchTitulo);
      return this.goToParam(this.searchTitulo);
    }
    else{
      this.goToGetAll();
    }
  }
  goToEdit(id: number) {//
    console.log(id);
    this.router.navigate(["cadernos/caderno-edit", id]);
  }

  goToDelete(id: number): void {
    console.log("EXCLUIR");
    this.cadernoService.delete(id)
      .subscribe(() => { this.goToGetAll() }
      );
  }
  goToClearList(){
    this.cadernos=[];
  }

  
  goToReadById(id: number): void {//Read
    console.log("CadernoIndexComponent.getbyId()");
    this.cadernoService.getById(id)
      .pipe(
        take(1)
      ).subscribe(data => {
        if (data != null)
          this.cadernos.push(data);
      });
  }
  goToParam(titulo: string): void {//Read
    console.log("CadernoIndexComponent.getToParam()");
    this.cadernoService.getByParam(titulo)
      .pipe(
        take(1)
      ).subscribe(data => { this.cadernos = data; }
      );
  }

  goToGetAll(): void {//Read
    console.log("CadernoIndexComponent.getAll()");
    this.cadernoService.getAll()
      .pipe(
        take(1)
      ).subscribe(data => { this.cadernos = data; }
      );
  }

}




