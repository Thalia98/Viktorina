import { Chat } from "src/app/interfaces/Chat";

export class ChatGroups {
    id?: string;
    chat: Chat[] = [];

    constructor(chat) {
        this.chat = chat;
    }
}