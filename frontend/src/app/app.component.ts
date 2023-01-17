import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project_planning';
  constructor(private authService:AuthService){}
  ngOnInit() {
    this.authService.autoAuthUser().subscribe(()=>{},error=>{
      console.log('autoAuthUser error', error)
    })
  }
}
