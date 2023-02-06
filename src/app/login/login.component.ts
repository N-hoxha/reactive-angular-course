import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import { AuthStore } from '../service/auth.store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authStore: AuthStore
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;

    // *** ketu do bejme nje prove nese funksjonon servisi pa i ber subscribe ???? || si pas proves qe bera, nese fshim subscribe nuk punon endpointi login
    this.authStore.login(val.email, val.password).subscribe((response: any) => {
      console.log("Response data when login user in COMPONENTS", response);
      this.router.navigateByUrl("/courses");
    }, error => {
      alert("Login failed");
    });

  }

}
