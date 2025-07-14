import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  RegisterData: any = {
    RegisterUserName: '',
    RegisterPassword: '',
    confirmPassword: '',
  };
  users: any = [];

  message: string = '';
  showmsg: boolean = false;
  showerrmsg: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onSubmit(RegisterForm: any) {
    if (RegisterForm.valid) {
      if (this.RegisterData.RegisterPassword !== this.RegisterData.confirmPassword) {
        this.message = 'Password mismatch';
        this.showerrmsg = true;
        this.showmsg = false;
        return;
      }

        this.users = JSON.parse(localStorage.getItem('users') || '[]');


      const exists = this.users.some((user: any) => user.username === this.RegisterData.RegisterUserName);
      if (exists) {
        this.message = 'Username already exists';
        this.showerrmsg = true;
        return;
      }

   
      this.users.push({
        username: this.RegisterData.RegisterUserName,
        password: this.RegisterData.RegisterPassword
      });

      localStorage.setItem('users', JSON.stringify(this.users));
      this.message = 'Register Success';
      this.showmsg = true;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  clearForm(RegisterForm: any) {
    RegisterForm.resetForm();
    this.showerrmsg = false;
    this.showmsg = false;
  }
}
