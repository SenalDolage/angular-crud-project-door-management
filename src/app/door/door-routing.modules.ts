import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ListByProjectComponent } from './list-by-project/list-by-project.component';

const routes: Routes = [
  { path: 'form/:id', component: FormComponent },
  { path: 'form', component: FormComponent },
  { path: 'door-list/:id', component: ListByProjectComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoorRoutingModule {}
