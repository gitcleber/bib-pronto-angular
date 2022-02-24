import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Doce } from 'src/app/model/doce.model';
import { DoceService } from 'src/app/services/doce/doce.service';

@Component({
  selector: 'app-doce-index',
  templateUrl: './doce-index.component.html',
  styleUrls: ['./doce-index.component.css']
})
export class DoceIndexComponent implements OnInit {

  doces: Doce[];
  searchId: string;
  searchDescricao: string;

  constructor(private router: Router, private doceService: DoceService) {
    this.doces = new Array<Doce>();
    this.searchId = "";
    this.searchDescricao = "";
  }

  ngOnInit(): void {
  }

  goToList(): void {
    this.clearList();
    console.log('goToList')

    if (this.searchId !== "") { 
      console.log('getByID');
      const id: number = Number(this.searchId);
      this.getById(id);
      return;
    }

    if (this.searchDescricao !== "") {
      console.log('getByParam')
      this.getByDescricao(this.searchDescricao);
      return;
    }
    console.log('getAll')
    this.getAll();
    
  }

  clearList(): void {
    this.doces = [];
  }

  getById(id: number): void {
    this.doceService.getById(id)
      .pipe(
        take(1)
      )
      .subscribe(response => {
        if (response != null)
          this.doces.push(response);
      });
  }
  goToCreate(): void {
    // document.location="doce-create";
    this.router.navigateByUrl('doces/doce-create');
  }
  getByDescricao(descricao: string): void {
    this.doceService.getByParam(descricao)
      .subscribe(response => {
        this.doces = response;
      });
  }

  getAll(): void {
    this.doceService.getAll()
      .subscribe(
        response => { this.doces = response; }
      );
  }

  goToEdit(id: number) {
    this.router.navigate(['doces/doce-edit', id]);

  }
  goToDelete(id: number): void {
    this.doceService.delete(id)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.getAll()
      });

  }


}
