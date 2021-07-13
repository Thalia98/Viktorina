import { ShowQuestionnaireComponent } from './show-questionnaire/show-questionnaire.component';
import { MyQuestionnairesComponent } from './my-questionnaires/my-questionnaires.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { SharedModule } from '../shared/shared.module';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { ListQuestionComponent } from './list-question/list-question.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListQuestionnairesComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    ListQuestionComponent,
    MyQuestionnairesComponent,
    ShowQuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule.forRoot(),
    SharedModule,
  ],
})
export class DashboardModule { }
