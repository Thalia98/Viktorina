import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    DoQuizComponent,
    InitialCounterComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    IonicModule.forRoot(),
  ]
})
export class PlayModule { }
