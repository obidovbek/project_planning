import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService,
    ) { }


    postProject(){
        return this.http.post(environment.http.post_project.path, 
            this.dataService.plan
        )       
    }


}