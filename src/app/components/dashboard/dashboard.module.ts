import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListQuestionnairesComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule.forRoot(),
  ]
})
export class DashboardModule { }
