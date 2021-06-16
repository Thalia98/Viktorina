import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ListQuestionnairesComponent,
    CreateQuizComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule.forRoot(),
    SharedModule,
  ],
})
export class DashboardModule { }
