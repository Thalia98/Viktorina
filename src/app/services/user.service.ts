import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getUserById(id): Observable<any> {
    return this.firestore.collection('Users').doc(id).get();
  }

  getUserByUsername(username): Observable<any> {
    return this.firestore.collection('Users', ref => ref.where('username', '==', username)).snapshotChanges();
  }
}
