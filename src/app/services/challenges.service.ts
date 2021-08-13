import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { STATES_CHALLENGE } from '../globalValues';

@Injectable({
    providedIn: 'root'
})
export class ChallengesService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    getMyPetitions(id): Observable<any> {
        return this.firestore.collection('ChallengePetition', ref => ref.where('userReceiverId', '==', id)).snapshotChanges();
    }

    removePetition(id): Promise<any> {
        return this.firestore.collection('ChallengePetition').doc(id).delete();
    }

    sendChallengePetition(petition): Promise<any> {
        return this.firestore.collection('ChallengePetition').add(petition);
    }

    addChallengeGame(game): Promise<any> {
        return this.firestore.collection('ChallengeGame').add(game);
    }

    removeChallengePetition(id): Promise<any> {
        return this.firestore.collection('ChallengePetition').doc(id).delete();
    }

    setChallenges(challenges): Promise<any> {
        return this.firestore.collection('Challenges').add(challenges);
    }

    getMyChallengesUser1(id): Observable<any> {
        return this.firestore.collection("ChallengeGame", ref => ref.where('userId1', '==', id)).snapshotChanges();
    }

    getMyChallengesUser2(id): Observable<any> {
        return this.firestore.collection("ChallengeGame", ref => ref.where('userId2', '==', id)).snapshotChanges();
    }

    updateChallengeStateUser1(id): Promise<any> {
        const challengeGameRef = this.firestore.collection('ChallengeGame').doc(id);

        return challengeGameRef.update({ stateUser1: STATES_CHALLENGE.FINALIZED });
    }

    updateChallengeStateUser2(id): Promise<any> {
        const challengeGameRef = this.firestore.collection('ChallengeGame').doc(id);

        return challengeGameRef.update({ stateUser2: STATES_CHALLENGE.FINALIZED });
    }

    setWinner(id, username): Promise<any> {
        const challengeGameRef = this.firestore.collection('ChallengeGame').doc(id);

        return challengeGameRef.update({ winner: username });
    }
}