import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { ListComponent } from './list/list.component';
import { ProjectRoutingModule } from './project-routing.modules';
import { FormComponent } from './form/form.component';
import { CommonHttpInterceptor } from '../utils';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonHttpInterceptor,
      multi: true,
    },
  ],
})
export class ProjectModule {}
