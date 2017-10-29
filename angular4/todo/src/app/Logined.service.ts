import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

declare var $: any;
@Injectable()
export class LoginedService {
  isLogged = false;

  u_id: number;

  redirectUrl: string;

  constructor(private http: HttpClient) {}

  loginIn(name: string, pwd: string): Promise<Object> {
    const url = 'http://www.zx-zone.top/account/ajax/login.php';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, $.param({name: name, pwd: pwd}), {headers})
      .toPromise()
      .then(res => {
        if (res['state'] === 'ok') {
          this.isLogged = true;
          this.u_id = parseInt(res['u_id']);
        }else {
          this.isLogged = false;
        }
        return res;
      });
  }
  logout(): void {
    this.isLogged = false;
  }
}
