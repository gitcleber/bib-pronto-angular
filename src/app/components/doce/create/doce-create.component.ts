import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Doce } from 'src/app/model/doce.model';
import { DoceService } from 'src/app/services/doce/doce.service';

@Component({
  selector: 'app-doce-create',
  templateUrl: './doce-create.component.html',
  styleUrls: ['./doce-create.component.css']
})
export class DoceCreateComponent implements OnInit {

  doce: Doce;

  constructor(private router: Router, private doceService: DoceService) {
    this.doce = new Doce();
   }

  ngOnInit(): void {
  }
  goToIndex(): void {
    this.router.navigateByUrl("doces/doce-index");
  }

  goToCreate(): void {
    this.doceService.post(this.doce)
      .pipe(
        take(1)
      )
      .subscribe(data => {
        this.doce = data;
        this.goToIndex();
      });
    console.log("DoceEditComponent-edit-end");
  }
}
