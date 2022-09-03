import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { UsersComponent } from './components/users/users.component';
import { VistaUserComponent } from './components/vista-user/vista-user.component';


const routes: Routes = [
  {path : '', component : HomeComponent},
  {path: 'newuser',component:NewuserComponent},
  {path:  'users' , component: UsersComponent},
  {path: 'home', component: HomeComponent},
  {path: 'USERS/:id', component: VistaUserComponent },
  {path: 'updateuser/:id', component:NewuserComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
