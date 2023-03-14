import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../servives/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css']
})
export class RegesterComponent {
  registerform = this.fb.group({
    uname:[''],
    pno:['',[Validators.required,Validators.pattern('[0-9]*')]],//validations in Angular.
    pswd:['', [Validators.required,Validators.pattern('[0-9A-Za-z]*')]],
    photo:['']

  })
  message:any=''
  sucessMsg:boolean=false
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}


  logindata(){
    if(this.registerform.valid){

    let pno = this.registerform.value.pno
      let pswd =this.registerform.value.pswd
      let uname=this.registerform.value.uname
      let photo = this.registerform.value.photo

      this.api.register(pno,pswd,uname,photo).subscribe((result:any)=>{
        console.log(result.message);
        this.message = result.message
        this.sucessMsg = true;
        setTimeout(()=>{
          this.router.navigateByUrl('')

        },2000)

        
      },
      (result:any)=>{
        console.log(result.error.message);
        this.message = result.error.message

        
      })  

  
    }
      
  }
}
