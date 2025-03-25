import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'add', component: TaskFormComponent},
  {path: 'edit/:id', component: TaskFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule { }