import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit{
  joinRoomForm: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.joinRoomForm = this.formBuilder.group({
      user: ['', Validators.required],
      room: ['', Validators.required],

    })
  }

  ngOnInit(): void {
  
  }

  joinRoom(){
    console.log(this.joinRoomForm.value);
    this.router.navigate(['chat']);
  }
}
