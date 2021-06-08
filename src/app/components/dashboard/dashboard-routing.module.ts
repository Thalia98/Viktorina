import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';

const routes: Routes = [
  { path: '', component: ListQuestionnairesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
