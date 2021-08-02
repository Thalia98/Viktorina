import { PetitionsComponent } from './petitions/petitions.component';
import { ChatBaseComponent } from './chat-base/chat-base.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatGroupRoutingModule } from './chat-group-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ChatBaseComponent,
    PetitionsComponent,
  ],
  imports: [
    CommonModule,
    ChatGroupRoutingModule,
    SharedModule,
    IonicModule.forRoot(),
  ]
})
export class ChatGroupModule { }
