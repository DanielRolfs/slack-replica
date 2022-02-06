import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './chatwindow/menu/menu.component';
import { UsersComponent } from './chatwindow/menu/menu-tree/users/users.component';
import { MainChatComponent } from './chatwindow/main-chat/main-chat.component';
import { ThreadComponent } from './chatwindow/main-chat/thread/thread.component';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';
import { MenuTreeComponent } from './chatwindow/menu/menu-tree/menu-tree.component';
import { MessageSendComponent } from './chatwindow/chatcomponents/message-send/message-send.component';
import { ChatInputComponent } from './chatwindow/chatcomponents/chat-input/chat-input.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordresetComponent,
    MenuComponent,
    UsersComponent,
    MainChatComponent,
    ThreadComponent,
    ChatwindowComponent,
    MenuTreeComponent,
    MessageSendComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
