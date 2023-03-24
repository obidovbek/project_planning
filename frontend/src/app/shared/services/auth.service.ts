import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "src/environments/environment.prod";
import { AuthData, UserLogin } from "src/app/shared/models/auth-data.model";

import { Observable } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';
import { HttpService } from "./http.service";
// const BACKEND_URL:any = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string = '';
  private tokenTimer: any;
  private roles: string = '';
  private authStatusListener = new Subject<boolean>();

  user: Observable<any> = new Observable(res=>{res.next(null)});////
  userData: AuthData = {
    _id: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    ouqRole: '',
    role: '',
  };

  user_sec:any = {token: ''};

  constructor(
    private http: HttpClient, 
    private router: Router,
    private HttpService: HttpService  
  ) {
    this.user_sec.token = "VTnx0AHUciaEMrjipFGTcElDBSg1";

  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getroles() {
    return this.roles;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(authData: AuthData) {
    return this.http.post(environment.http.login.path, authData)
  }

  login(authData: UserLogin): Observable<any> {
    // const authData: AuthData = { email: email, password: password };
    return this.user = this.http
      .post<{ token: string; expiresIn: number; roles: string[], user: AuthData }>(
        environment.http.login.path,
        authData
      )
      .pipe(
        map((response:any) => {
          console.log('login response', response)
          const token = response.token;
          // this.userData = response.user;
          this.token = token;
          if (token) {
            const expiresInDuration = 86400;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.roles = response.roles;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.roles);
          }else{
            alert(response.message);
          }
          return {roles: response.roles};
        }, (error:any) => {
          this.authStatusListener.next(false);
          console.error(error)
        })
      )
  }

  autoAuthUser(): Observable<any> {

    const authInformation = this.getAuthData();
    console.log('authInformation',authInformation)
    if (!authInformation) {
      return new Observable(ob=>{ob.next(null)});
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
        this.token = authInformation.token;
        return this.user = this.HttpService.autoLogin(this.token)
        .pipe(
          map((response:any) => {
            console.log('login response', response)
            // const token = response.token;
            // this.token = token;
            // if (token) {
              // const expiresInDuration = 86400;
              // this.setAuthTimer(expiresInDuration);
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
            //   const now = new Date();
            //   const expirationDate = new Date(
            //     now.getTime() + expiresInDuration * 1000
            //   );
            //   this.saveAuthData(token, expirationDate, this.roles);
            // }else{
            //   alert(response.message);
            // }
            return {roles: response.roles};
          }, (error:any) => {
             this.authStatusListener.next(false);
              console.error(error)
           }) 
        )
    }else{
      return new Observable(ob=>{ob.next(null)});;
    }
  }
  errorHandler(error: HttpErrorResponse) {
    return this.user = new Observable(res=>{res.next(null)});
  }
  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.roles = '';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    // setTimeout(()=>{this.router.navigate(["/auth/login"]);})
    window.location.reload()
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, roles: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("roles");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const roles = localStorage.getItem("roles");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      roles: roles
    };
  }
}
