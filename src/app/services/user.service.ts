import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  saveUser(user): Promise<any> {
      return this.firestore.collection('Users').add(user);
  }

  checkUsername(username): Observable<any> {
    return this.firestore.collection('Users', ref => ref.where('username', '==', username)).snapshotChanges();
  }

  getUser(uid): Observable<any> {
    return this.firestore.collection('Users', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
}
