import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthData } from "src/app/shared/models/auth-data.model";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    ) { }


    reviewProject(data:any){
      return this.http.post(environment.http.review_project.path, 
          data
      )       
    }
    postProject(post:any){
        return this.http.post(environment.http.post_project.path, 
            post
        )       
    }

    getOneProject(announcedNumber:number){
      return this.http.get(environment.http.get_one_project.path + announcedNumber)       
    }
    getProjects(page:number, limit:number){
      let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('filters', JSON.stringify([]));
      return this.http.get(environment.http.get_projects.path, {params: params})       
    }

    autoLogin(TOKEN:string){
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);
      return  this.http.get<{ user: AuthData }>(environment.http.autologin.path, { headers })
    }

}