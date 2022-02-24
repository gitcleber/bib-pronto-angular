import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Gibi } from 'src/app/model/gibi';
import { GibiService } from 'src/app/services/gibi/gibi.service';

@Component({
  selector: 'app-gibi-edit',
  templateUrl: './gibi-edit.component.html',
  styleUrls: ['./gibi-edit.component.css']
})
export class GibiEditComponent implements OnInit {
  gibi: Gibi;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private gibiService: GibiService) { 
    this.gibi = new Gibi();
  }

  ngOnInit(): void {
    const id: number = Number(this.activeRoute.snapshot.paramMap.get("id"));//this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.getById(id);    
  }

  goToIndex(){
    this.router.navigateByUrl('gibis/gibi-index')

  }

  getById(id: number): void{  
    this.gibiService.getById(id)
      .pipe(take(1))
      .subscribe(data => {this.gibi = data}
      );  
  }

  goToEdit(): void{
    this.gibiService.put(this.gibi)
      .pipe(
        take(1)
      )
      .subscribe(()=>{
        this.goToIndex();
      });

  }

}
