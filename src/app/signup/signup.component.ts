import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

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

  constructor(private router: Router,
    private firebase: FirebaseService
  ) { }

  ngOnInit(): void { }

  onSubmit(RegisterForm: any) {
    if (RegisterForm.valid) {
      this.firebase.checkUsername(this.RegisterData.RegisterUserName, (exists: boolean) => {
        if (exists) {
          this.message = 'Signup Success';
          this.showerrmsg = false;
          this.showmsg = true;
        } else {
          this.firebase.addUser({
            username: this.RegisterData.RegisterUserName,
            password: this.RegisterData.RegisterPassword
          });
          this.message = 'Signup Success';
          this.showmsg = true;
          this.showerrmsg = false;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
    }
  }

  clearForm(RegisterForm: any) {
    RegisterForm.resetForm();
    this.showerrmsg = false;
    this.showmsg = false;
  }
}
