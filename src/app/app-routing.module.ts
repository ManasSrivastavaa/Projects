import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component'
import { authGuard } from './auth.guard';
import { ChatWidetAdminComponent } from './chat-widget-admin/chat-widet-admin.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';

const routes: Routes = [
  {path:"home",component:HomePageComponent,canActivate:[authGuard]},
  {path:"",component:LoginAndRegisterComponent},
  {path:"register",component:RegisterComponent},
  {path:"admin",component:ChatWidetAdminComponent},
  {path:"chat",component:ChatWidgetComponent},
  {path:"**",component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
