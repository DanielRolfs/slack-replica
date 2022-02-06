import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
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
import { ChannelsComponent } from './chatwindow/menu/channels/channels.component';
import { ChannelComponent } from './chatwindow/menu/channels/channel/channel.component';
import { DirectMessagesComponent } from './chatwindow/menu/direct-messages/direct-messages.component';
import { UsersComponent } from './chatwindow/menu/direct-messages/users/users.component';
import { ChathistoryComponent } from './chatwindow/chathistory/chathistory.component';
import { ThreadComponent } from './chatwindow/chathistory/thread/thread.component';
import { ChatwindowComponent } from './chatwindow/chatwindow/chatwindow.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordresetComponent,
    MenuComponent,
    ChannelsComponent,
    ChannelComponent,
    DirectMessagesComponent,
    UsersComponent,
    ChathistoryComponent,
    ThreadComponent,
    ChatwindowComponent
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
