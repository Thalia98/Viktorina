import { UserResponseComponent } from './../shared/user-response/user-response.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoQuizComponent } from './do-quiz/do-quiz.component';

const routes: Routes = [
  { path: 'initial-counter/:id', component: InitialCounterComponent },
  { path: 'doQuiz', component: DoQuizComponent },
  { path: 'answer-user/:id', component: UserResponseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
