import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  ResetData: any = {
    RPassword: '',
    confirmPassword: '',
    username: ''
  };

  msgerr: string  = '';
  showmsgerr: boolean=false;
  msgsucc:string = '';
  showmsgsucc:boolean = false;

  users: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.ResetData.username = sessionStorage.getItem('username');  
  }

  onSubmit(ResetpwdForm: any) {
    if (ResetpwdForm.valid) {
      if (this.ResetData.RPassword !== this.ResetData.confirmPassword) {
        this.msgerr = 'invalid Credential';
        this.showmsgerr=true;
      }

      this.users = JSON.parse(localStorage.getItem('users') || '[]');

      const userindex = this.users.findIndex(
        (user: any) => user.username === this.ResetData.username
      );

      if (userindex !== -1) {
        this.users[userindex].password = this.ResetData.RPassword;

        localStorage.setItem('users', JSON.stringify(this.users));
        sessionStorage.setItem('Resetedpwd', this.ResetData.RPassword);
        this.msgsucc = 'Password Reset Success';
        this.showmsgsucc =true;

        this.router.navigate(['/login']);
      } 
    }
  }

  clearForm(ResetpwdForm: any) {
    ResetpwdForm.resetForm();
  }
}
