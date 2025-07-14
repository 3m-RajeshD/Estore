import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  frgtpwdData: any = {
    ForgetUsername: '',
  };

  msgerr: string = '';
  msgsucc: string = '';
  showmsgerr: boolean = false;
  showmsgsucc: boolean = false;

  constructor(private router: Router, private firebase: FirebaseService) { }

  ngOnInit(): void { }

  onSubmit(frgtpwd: any) {
    if (frgtpwd.valid) {
      this.firebase.checkUsername(this.frgtpwdData.ForgetUsername, (exists: boolean, userObj?: any) => {
        if (exists && userObj) {
          sessionStorage.setItem('username', userObj.username);
          this.msgsucc = 'Username Found'
          this.showmsgsucc = true;
          setTimeout(() => {
            this.router.navigate(['/resetpwd']);
          }, 2000);

        } else {
          this.msgerr = 'Invalid username';
          this.showmsgerr = true;
        }
      });
    }
  }
}
