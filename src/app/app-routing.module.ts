import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'door',
    loadChildren: () => import('./door/door.module').then((m) => m.DoorModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
