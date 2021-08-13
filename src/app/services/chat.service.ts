import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    getMySendPetitions(id): Observable<any> {
        return this.firestore.collection('FriendsPetitions', ref => ref.where('userPetitionerId', '==', id)).snapshotChanges();
    }

    getMyPetitions(id): Observable<any> {
        return this.firestore.collection('FriendsPetitions', ref => ref.where('userReceiverId', '==', id)).snapshotChanges();
    }

    setFriends(id, friends): Promise<any> {
        const userRef = this.firestore.collection('Users').doc(id);

        return userRef.update({ friends: friends });
    }

    setChatGroup(id, chatGroup): Promise<any> {
        const userRef = this.firestore.collection('Users').doc(id);

        return userRef.update({ chatGroups: chatGroup });
    }

    sendPetition(petition): Promise<any> {
        return this.firestore.collection('FriendsPetitions').add(petition);
    }

    removePetition(id): Promise<any> {
        return this.firestore.collection('FriendsPetitions').doc(id).delete();
    }

    getChatGroup(id): Observable<any> {
        return this.firestore.collection('ChatGroup').doc(id).snapshotChanges();
    }

    addChatGroup(chat): Promise<any> {
        return this.firestore.collection('ChatGroup').add(chat);
    }

    sendMessage(id, chatMessage): Promise<any> {
        const chatRef = this.firestore.collection('ChatGroup').doc(id);

        return chatRef.update({ chat: chatMessage });
    }
}
