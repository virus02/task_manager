import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutesModule } from "./app.routes";

import { AppComponent } from "./app.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    AppRoutesModule
  ],
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }