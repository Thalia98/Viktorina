import { UserResponseChallengeComponent } from './../shared/user-response-challenge/user-response-challenge.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { UserResponseComponent } from '../shared/user-response/user-response.component';


@NgModule({
  declarations: [
    DoQuizComponent,
    InitialCounterComponent,
    UserResponseComponent,
    UserResponseChallengeComponent,
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule,
    IonicModule.forRoot(),
  ]
})
export class PlayModule { }
