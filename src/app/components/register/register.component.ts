import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '/home/user/Desktop/Fundoo-notes/src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 userForm:FormGroup;

  constructor(private router: Router, private user: UserServiceService) { }

  ngOnInit() {
   this.userForm=new FormGroup({
      firstname : new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(4)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirm_password: new FormControl('',[Validators.required,Validators.minLength(5)]),
      services:new FormControl('',[Validators.required,Validators.minLength(3)])
    });
  }
  click():void{
 var dataset={
  firstName: this.userForm.value.firstname,
  lastName: this.userForm.value.lastname,
  email: this.userForm.value.email,
  password: this.userForm.value.password,
  confirm_password:this.userForm.value.confirm_password,
  services:this.userForm.value.services
 };
 if(this.userForm.valid){
this.user.signUp(dataset);
  console.log("Sign Up Successful");
}
}
}











 // obs.subscribe((response)=>{
  //   console.log("Response!!",response)
  // });