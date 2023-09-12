import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ListEmployeeComponent } from './components/employee/list-employee/list-employee.component';
import { ConfigService } from './services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from './shared/module/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { HighLightDirective } from './shared/directives/high-light.directive';
import { DetailEmployeeComponent } from './components/employee/detail-employee/detail-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ListEmployeeComponent,
    HighLightDirective,
    DetailEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule,
    FormsModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
