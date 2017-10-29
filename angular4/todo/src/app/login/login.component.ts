import { Component, OnInit } from '@angular/core';
import { LoginedService } from '../Logined.service';
import { Router } from '@angular/router';
import { Modal } from '../modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '';
  pwd = '';
  model = new Modal();
  constructor(
    private loginhttp: LoginedService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  submit(): void {
    if (this.name === '' || this.pwd === '') {
      return;
    }
    this.loginhttp.loginIn(this.name, this.pwd)
     .then(() => {
       if (this.loginhttp.isLogged) {
         const redirectUrl = this.loginhttp.redirectUrl ? this.loginhttp.redirectUrl : '/todo';
         this.router.navigate([redirectUrl]);
       }else {
         this.model.openstate('帐号或密码错误');
       }
     });
    
  }

}
