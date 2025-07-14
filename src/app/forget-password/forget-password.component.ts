import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  frgtpwdData: any = {
    ForgetUsername: '',
  }
  validUsername :any = '';

  msg: string = '';
  showerror: boolean = false;
  users :any =[];


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.validUsername = localStorage.getItem('username')

  }

  onSubmit(frgtpwd: any) {
    console.log(true);
    console.log(frgtpwd);
    console.log(sessionStorage.getItem('username'));
    console.log(this.validUsername, 'valid');
    console.log(this.frgtpwdData.ForgetUsername, 'user');


    if (frgtpwd.valid) {
      console.log('fine');
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
      console.log(this.users, 'users');
      
       this.validUsername = this.users.find(
        (user: any) =>
          user.username === this.frgtpwdData.ForgetUsername);
        console.log(this.users.username);
        console.log(this.validUsername);
        
        
      if (this.validUsername) {
        sessionStorage.setItem('username', this.validUsername.username);
        console.log('works');
        this.router.navigate(['/resetpwd'])
      }
      else {
        console.log('error');

        this.msg = 'invalid Username';
        this.showerror = true;
      }
    }
  }
}
