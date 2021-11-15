import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { FormComponent } from './form/form.component';
import { DoorRoutingModule } from './door-routing.modules';
import { ListByProjectComponent } from './list-by-project/list-by-project.component';
import { CommonHttpInterceptor } from '../utils';

@NgModule({
  declarations: [FormComponent, ListByProjectComponent],
  imports: [
    CommonModule,
    FormsModule,
    DoorRoutingModule,
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
export class DoorModule {}
