import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { BoardslistComponent } from './boardslist/boardslist.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allboards', component: BoardslistComponent },
  { path: 'allboards/:id', component: BoardComponent },
  { path: "**",redirectTo:"/main"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
