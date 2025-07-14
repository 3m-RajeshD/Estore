import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

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
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
      const matchedUsername = this.users.find(
        (user: any) =>
          user.username === this.LoginData.UserName &&
          user.password === this.LoginData.Password
      );

      if (matchedUsername) {
        if (this.LoginData.Remember) {
          localStorage.setItem('rememberedUsername', this.LoginData.UserName);
          localStorage.setItem('rememberedPassword', this.LoginData.Password);
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
