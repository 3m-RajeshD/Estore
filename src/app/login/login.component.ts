import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

interface User {
  UserName: string;
  Password: string;
  Remember: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginData: User = {
    UserName: '',
    Password: '',
    Remember: false,
  };
  users: any = [];

  msgerr: string = '';
  msgsucc: string = '';

  showerror = false;
  showsuccess = false;

  constructor(private router: Router, private firebase: FirebaseService) { }

  ngOnInit(): void {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedUsername && rememberedPassword) {
      this.LoginData.UserName = rememberedUsername;
      this.LoginData.Password = rememberedPassword;
      this.LoginData.Remember = true;
    }
  }

  onSubmit(LoginForm: any) {
    if (LoginForm.valid) {
      this.firebase.validateLogin(
        this.LoginData.UserName,
        this.LoginData.Password,
        (success: boolean) => {
          if (success) {
            if (this.LoginData.Remember) {
              localStorage.setItem('rememberedUsername', this.LoginData.UserName);
              localStorage.setItem('rememberedPassword', this.LoginData.Password);
            }
            else {
              localStorage.removeItem('rememberedUsername');
              localStorage.removeItem('rememberedPassword');
            }

            sessionStorage.setItem('is_login', 'true');
            sessionStorage.setItem('UserName', this.LoginData.UserName);

            this.msgsucc = 'Login Successful';
            this.showsuccess = true;

            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          } else {
            this.msgerr = 'Invalid username or password';
            this.showerror = true;

          }
        }
      );


  } else {
  this.msgerr = 'Please fill in all required fields';
  this.showerror = true;
}
  }

clearForm(LoginForm: any) {
  LoginForm.resetForm();
  this.showerror = false;
  this.showsuccess = false;
}

onForgetPassword() {
  console.log('true');

  this.router.navigate(['/forgetpwd']);
}

Signup() {
  this.router.navigate(['/signup']);
}
}
