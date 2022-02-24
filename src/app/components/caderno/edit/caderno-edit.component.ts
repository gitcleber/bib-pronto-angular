import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Caderno } from 'src/app/model/caderno.model';
import { CadernoService } from 'src/app/services/caderno/caderno.service';

@Component({
  selector: 'app-caderno-edit',
  templateUrl: './caderno-edit.component.html',
  styleUrls: ['./caderno-edit.component.css']
})
export class CadernoEditComponent implements OnInit {

  caderno: Caderno;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private cadernoService: CadernoService) {
    
      this.caderno = new Caderno();
   }

  ngOnInit(): void {
    const id: number = Number(this.activeRoute.snapshot.paramMap.get("id"));//this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.getById(id);    
  }
  goToIndex(): void {
    //document.location="caderno-index";
    this.router.navigateByUrl("cadernos/caderno-index");
  }

  getById(id:number): void{
    this.cadernoService.getById(id)
      .pipe(take(1))
      .subscribe(data => {
        if(data !== null)
          this.caderno = data;
      });
  }
  goToPut():void{
    console.log(this.caderno)
    this.cadernoService.put(this.caderno)
      .pipe(
        take(1)
      )
      .subscribe();
      this.goToIndex();
    }
  }