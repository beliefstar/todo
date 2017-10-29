import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { LoginedService } from './Logined.service';

import { Todo } from './todo';

declare var $: any;
@Injectable()
export class AppService {
  private ApiUrl = 'http://www.zx-zone.top/api/todo/?';
  constructor(
    private http: HttpClient,
    private loginser: LoginedService
  ) { }

  query_all(): Promise<Todo[]> {
    const url = `${this.ApiUrl}type=query_all&u_id=${this.loginser.u_id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => {
          return res;
      })
      .catch(this.errorHandle);
  }
  add_todo(content: string): Promise<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const url = `${this.ApiUrl}type=add_todo&u_id=${this.loginser.u_id}`;
    return this.http.post(url, $.param({content: content}), {headers})
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(this.errorHandle);
  }
  detele_todo(id: number): Promise<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const url = `${this.ApiUrl}type=detele_todo`;
    return this.http.post(url, $.param({id: id}), {headers})
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(this.errorHandle);
  }
  finish(id: number): Promise<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const url = `${this.ApiUrl}type=finish`;
    return this.http.post(url, $.param({id: id}), {headers})
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(this.errorHandle);
  }
  private errorHandle(error: any): Promise<any> {
    console.log('一个错误发生了');
    return Promise.reject(error.message || error);
  }
}
