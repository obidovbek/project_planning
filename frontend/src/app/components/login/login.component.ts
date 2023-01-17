import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    
    constructor(
      private auth: AuthService,
      private fb: FormBuilder,
      private router: Router,
    ){}
    public loginForm: FormGroup = this.createLoginForm();

    ngOnInit(): void {
    }

    // loginForm = new FormGroup({
    //     email: new FormControl(``, Validators.required),
    //     password: new FormControl(``, Validators.required),
    // });
    async login() {
        this.auth.login(this.loginForm.value).subscribe(res=>{
          this.router.navigateByUrl('/plans');
        })
    }
    createLoginForm() {
      return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
}


