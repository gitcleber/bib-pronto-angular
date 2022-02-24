import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Caderno } from 'src/app/model/caderno.model';
import { CadernoService } from 'src/app/services/caderno/caderno.service';


@Component({
  selector: 'app-caderno-create',
  templateUrl: './caderno-create.component.html',
  styleUrls: ['./caderno-create.component.css']
})
export class CadernoCreateComponent implements OnInit {

  caderno: Caderno;

  constructor(private router: Router, private cadernoService: CadernoService) {
    // console.log("CadernoCreateComponent-constructor");
    this.caderno= new Caderno();
  }

  ngOnInit(): void {
    // console.log("CadernoCreateComponent-ngOnInit");
  }
  goToIndex(): void {
    //document.location="caderno-index";
    this.router.navigateByUrl("cadernos/caderno-index");
  }

  save(): void {
    console.log("CadernoCreateComponent-create");
    this.cadernoService.post(this.caderno)
      .pipe(
          take(1)
      )
      .subscribe(data=>{
        this.caderno=data;
        this.goToIndex();
      });
  }
  
  // delete(): void{
  //   this.cadernoService.delete(this.caderno.Id)
  // }
}

