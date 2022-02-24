import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Doce } from 'src/app/model/doce.model';
import { DoceService } from 'src/app/services/doce/doce.service';

@Component({
  selector: 'app-doce-edit',
  templateUrl: './doce-edit.component.html',
  styleUrls: ['./doce-edit.component.css']
})
export class DoceEditComponent implements OnInit {

  doce: Doce;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private doceService: DoceService) { 
    this.doce = new Doce();
  }

  ngOnInit(): void {
    const id: number = Number(this.activeRoute.snapshot.paramMap.get("id"));//this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.getById(id);
  }

  goToIndex(){
    this.router.navigateByUrl('doces/doce-index')

  }
  getById(id: number): void{  
    this.doceService.getById(id)
      .pipe(take(1))
      .subscribe(data => {this.doce = data}
      );  
  }

  goToEdit(): void{
    this.doceService.put(this.doce)
      .pipe(
        take(1)
      )
      .subscribe(()=>{
        this.goToIndex();
      });

  }

}
