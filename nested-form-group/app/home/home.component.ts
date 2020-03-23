import { Authservice } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router,private authService:Authservice) { }

  ngOnInit() {
  }
  onLoadServer(id:number){
    this.route.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'},fragment:'loading'})
  }
  onLogIn(){
    this.authService.login()
  }
  onLogout(){
    this.authService.logout()
  }
}
