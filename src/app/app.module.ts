import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorComponent } from './error/error.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ChatWidetAdminComponent } from './chat-widget-admin/chat-widet-admin.component';
import { FormsModule } from '@angular/forms';
import{DragDropModule} from'@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginAndRegisterComponent,
    HomePageComponent,
    ErrorComponent,
    RegisterComponent,
    ChatWidgetComponent,
    ChatWidetAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
   MatTooltipModule,
   MatButtonModule,
   KeyboardShortcutsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
