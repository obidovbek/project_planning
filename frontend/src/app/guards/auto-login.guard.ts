import { AuthService } from 'src/app/shared/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('auto login');
    const expectedRole = route.data['role'];
    return this.authService.user.pipe(
      take(1),
      map(user => {
        console.log(user)
        if (!user) {
          return true;
        } else {
          let role = user['roles']['tiil'];
          if (role === "ADMIN") {
            this.router.navigateByUrl('/plans');
            return false;
          }else {
            return true;
          }
        }
      })
    )
  }
}
