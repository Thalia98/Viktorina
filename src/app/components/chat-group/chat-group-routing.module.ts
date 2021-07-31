import { ChatBaseComponent } from './chat-base/chat-base.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetitionsComponent } from './petitions/petitions.component';

const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: 'chat-base', component: ChatBaseComponent },
  { path: 'petitions', component: PetitionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatGroupRoutingModule { }
