import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: 'join-room',  
    component: JoinRoomComponent,
  },

  {
    path: 'welcome',  
    component: WelcomeComponent,
  },
  {
    path: 'chat',  
    component: ChatComponent,
  },
  {
    path: '',  
    component: JoinRoomComponent,
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }