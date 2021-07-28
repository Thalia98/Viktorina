export interface User {
    email: string;
    uid: string;
    username: string;
    friends: [];
    friendsWaiting: [];
    friendsPetitions: [];
    gamePetitions: [];
}