import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

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

  msgerr: string = '';
  showmsgerr: boolean = false;
  msgsucc: string = '';
  showmsgsucc: boolean = false;

  constructor(private router: Router, private firebase: FirebaseService) { }

  ngOnInit(): void {
    const username = sessionStorage.getItem('username');
    this.ResetData.username = username || '';
  }

  onSubmit(ResetpwdForm: any) {
  this.showmsgerr = false;
  this.showmsgsucc = false;

  if (ResetpwdForm.valid) {
    if (this.ResetData.RPassword !== this.ResetData.confirmPassword) {
      this.msgerr = 'Password and Confirm Password do not match';
      this.showmsgerr = true;
      return;
    }

    this.firebase.updatePassword(this.ResetData.username, this.ResetData.RPassword);

    this.msgsucc = 'Password Reset Successful';
    this.showmsgsucc = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}


  clearForm(ResetpwdForm: any) {
    ResetpwdForm.resetForm();
    this.showmsgerr = false;
    this.showmsgsucc = false;
  }
}
