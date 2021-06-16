import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';

const routes: Routes = [
  { path: '', component: ListQuestionnairesComponent},
  { path: 'createQuiz', component: CreateQuizComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
