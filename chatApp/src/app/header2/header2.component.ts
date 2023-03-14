import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  condition:boolean = true
  IsmodelShow:boolean=false
  constructor(private router:Router){}

  logout(){

    this.condition = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('currentAcno');
    this.IsmodelShow = true;

    //navigate to login page.
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      this.condition = true;
    }, 4000);

  }

}
