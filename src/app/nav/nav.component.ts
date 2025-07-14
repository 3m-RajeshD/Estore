import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav'; 


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  
  constructor(private router:Router) {}
  isAuthPage(): boolean{
    return this.router.url === './login' || this.router.url === './signup';
  }

  ngOnInit(): void {}

 
  
}
