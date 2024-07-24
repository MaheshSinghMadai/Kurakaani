import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit{
  joinRoomForm: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public chatService: ChatService
  ) {
    this.joinRoomForm = this.formBuilder.group({
      user: ['', Validators.required],
      room: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  
  }

  joinRoom(){
    const {user, room} = this.joinRoomForm.value;
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("room", room);
    this.chatService.joinRoom(user, room) 
      .then(()=> {
        this.router.navigate(['chat']);
        console.log(this.joinRoomForm.value);
        
      }).catch((err) => {
        console.log(err);
        
      })
  }
}
