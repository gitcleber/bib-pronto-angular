import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Gibi } from 'src/app/model/gibi';
import { GibiService } from 'src/app/services/gibi/gibi.service';

@Component({
  selector: 'app-gibi-index',
  templateUrl: './gibi-index.component.html',
  styleUrls: ['./gibi-index.component.css']
})
export class GibiIndexComponent implements OnInit {
  gibis: Gibi[];
  searchTitulo: string='';
  searchId: string='';

  constructor(private router: Router, private gibiService: GibiService) {
    this.gibis = new Array<Gibi>();
   }

  ngOnInit(): void {

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

  goToCreate(): void{
    this.router.navigateByUrl('gibis/gibi-create');
  }
  goToEdit(id: number){
    this.router.navigate(['gibis/gibi-edit', id])

  }
  goToDelete(id: number){
    this.gibiService.delete(id)
      .subscribe(()=>{this.goToGetAll()}
      );
  }
  goToReadById(id: number): void {//Read
    console.log("CadernoIndexComponent.getbyId()");
    this.gibiService.getById(id)
      .pipe(
        take(1)
      ).subscribe(data => {
        if (data != null)
          this.gibis.push(data);
      });
  }
  goToParam(titulo: string): void {//Read
    console.log("CadernoIndexComponent.getToParam()");
    this.gibiService.getByParam(titulo)
      .pipe(
        take(1)
      ).subscribe(data => { this.gibis = data; }
      );
  }



  goToGetAll(): void {//Read
    console.log("CadernoIndexComponent.getAll()");
    this.gibiService.getAll()
      .pipe(
        take(1)
      ).subscribe(data => { this.gibis = data; }
      );
  }

  goToClearList(){
    this.gibis=[];
  }

}
