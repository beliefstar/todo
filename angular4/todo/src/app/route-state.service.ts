import { Injectable } from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { LoginedService } from './Logined.service';

@Injectable()
export class RouteStateService implements CanActivate {

  constructor(
    private appservice: LoginedService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('守卫在此！');
    const url: string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.appservice.isLogged) {
      return true;
    }
    this.appservice.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
