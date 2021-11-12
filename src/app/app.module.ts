import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProjectModule } from './project/project.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProjectModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
