import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    

    ngOnInit(): void {
    }

    loginForm = new FormGroup({
        nameValue: new FormControl(``, Validators.required),
        passwordValue: new FormControl(``, Validators.required),
    });

}


