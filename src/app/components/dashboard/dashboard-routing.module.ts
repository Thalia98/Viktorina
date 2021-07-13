import { MyQuestionnairesComponent } from './my-questionnaires/my-questionnaires.component';
import { ShowQuestionnaireComponent } from './show-questionnaire/show-questionnaire.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';

const routes: Routes = [
  { path: '', component: ListQuestionnairesComponent},
  { path: 'myQuestionnaires', component: MyQuestionnairesComponent},
  { path: 'createQuiz', component: CreateQuizComponent},
  { path: 'createQuestions', component: CreateQuestionComponent},
  { path: 'showQuestionnaire/:id', component: ShowQuestionnaireComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
