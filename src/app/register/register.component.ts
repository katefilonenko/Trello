import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    username: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('You are successfully registred!', 'Success')
  }

  showError() {
    this.toastr.error('Input data must be unique', 'Major Error')
  }

  registerUser() {
    this.authService.registerUser(this.registerUserData)
      .subscribe(
        res => {

          this.showSuccess();
          localStorage.setItem('token', res.token)
          this.router.navigate(['/issues'])
        },
        err => {
          this.showError();
          console.log(err)
        }
      )
  }

}
