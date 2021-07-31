
export class FriendsPetitions {
    userReceiverId: string;
    userPetitionerId: string;

    constructor(userReceiverId, userPetitionerId) {
        this.userReceiverId = userReceiverId;
        this.userPetitionerId = userPetitionerId;
    }
}