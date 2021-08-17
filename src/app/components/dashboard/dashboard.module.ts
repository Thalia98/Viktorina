import { PaymentComponent } from './../modals/payment/payment.component';
import { ChallengeFriendComponent } from './../modals/challenge-friend/challenge-friend.component';
import { ChallengesPetitionsComponent } from '../modals/challenges-petitions/challenges-petitions.component';
import { ListChallengesComponent } from './list-challenges/list-challenges.component';
import { AddUserComponent } from './../modals/add-user/add-user.component';
import { FilterComponent } from './../modals/filter/filter.component';
import { RankingComponent } from './ranking/ranking.component';
import { StatisticsComponent } from './statistics/statistics.component';
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
import { HighchartsChartModule } from 'highcharts-angular';
import { ChatComponent } from '../modals/chat/chat.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    DashboardComponent,
    ListQuestionnairesComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    ListQuestionComponent,
    MyQuestionnairesComponent,
    ShowQuestionnaireComponent,
    StatisticsComponent,
    RankingComponent,
    FilterComponent,
    AddUserComponent,
    ChatComponent,
    ListChallengesComponent,
    ChallengesPetitionsComponent,
    ChallengeFriendComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
    DashboardRoutingModule,
    IonicModule.forRoot(),
    SharedModule,
    HighchartsChartModule,
  ],
})
export class DashboardModule { }
