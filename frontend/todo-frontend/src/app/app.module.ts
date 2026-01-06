import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodosComponent } from './todos/todos.component';
import { DashboardService } from './services/dashboard.service';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ DashboardService, TodoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
