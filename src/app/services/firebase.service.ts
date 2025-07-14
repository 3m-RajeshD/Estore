import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  addUser(User: any) {
    return this.db.list('/Users').push(User);
  }

  getUsers(): Observable<any[]> {
    return this.db.list('/Users').valueChanges();
  }

  checkUsername(username: string, callback: (exists: boolean, userObj?: any) => void) {
    const sub = this.db.list('/Users').snapshotChanges().subscribe(actions => {
      let foundUser: any = null;

      for (let action of actions) {
        const data = action.payload.val() as any;
        if (data.username === username) {
          foundUser = data;
          break;
        }
      }

      sub.unsubscribe(); 

      if (foundUser) {
        callback(true, foundUser); 
      } else {
        callback(false);
      }
    });
  }



  validateLogin(username: string, password: string, callback: (success: boolean) => void) {
    this.getUsers().subscribe(users => {
      const matchingUser = users.find(u =>
        u.username === username && u.password === password
      );
      callback(!!matchingUser);
    });
  }

  updatePassword(username: string, newPassword: string) {
    this.db.list('/Users').snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const user: any = action.payload.val();
        if (user.username === username) {
          this.db.object(`/Users/${action.key}`).update({ password: newPassword });
        }
      });
    });
  }

}
