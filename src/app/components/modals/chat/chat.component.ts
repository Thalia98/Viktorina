import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chat } from 'src/app/interfaces/Chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  chatFriend: any;
  user: any;
  collectionChat: Chat[] = [];
  message: string;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.getChatGroup();
  }

  ionViewDidEnter() {
    this.scrollToBottom();
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  sendMessage() {
    let date = new Date();
    let minutes: any;

    if (date.getMinutes() < 10) {
      minutes = '0' + date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    const messageChat: Chat = {
      message: this.message,
      date: date,
      userId: this.user.id,
      dateParse: date.getHours() + ':' + minutes
    };

    this.collectionChat.push(messageChat);

    this.chatService.sendMessage(this.chatFriend.chatGroupId, this.collectionChat).then(() => {
      this.message = undefined;
    }, error => { });
  }

  getChatGroup() {
    this.chatService.getChatGroup(this.chatFriend.chatGroupId).subscribe(chat => {
      this.collectionChat = chat.payload.data().chat;
    }, error => { });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
