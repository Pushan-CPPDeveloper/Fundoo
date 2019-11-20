import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '/home/user/Desktop/Fundoo-notes/src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  userForm: FormGroup;
  constructor(private router: Router, private user: UserServiceService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }
  Submit(): void {
    var data={
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
    if (this.userForm.valid) {
      var ob = this.user.logIn(data);
      ob.subscribe((res) => {
        if (res) {
          this.router.navigateByUrl('/dashboard');
        }
      });
    }
  }
  Click():void{
     this.router.navigateByUrl('/register');
  }

}
