import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    username: '',   
    password: ''
  }

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Logged in! Welcome', 'Success')
  }

  showError(){
    this.toastr.error('Wrong Username or Password. Please check your input data.', 'Major Error');
    this.router.navigate(['/login'])
  }

  loginUser () {
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        // console.log(res)
        this.showSuccess();
        localStorage.setItem('token', res.token)
        this.router.navigate(['/main'])
      },
      err => {
        this.showError();
        console.log(err)
      }
    ) 
  }

}
