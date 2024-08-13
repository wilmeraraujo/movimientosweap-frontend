import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  menuNav = [
    {
      name:"Inicio",
      route:"home",
      icon:"home"
    },
    {
      name:"Tipo documento",
      route:"tipo-documento",
      icon:"monetization_on"
    }
  ]
  constructor(media:MediaMatcher){
    this.mobileQuery = media.matchMedia('max-width: 600px');
  }
  ngOnInit(): void {
    //this.username = this.keycloakService.getUsername();
 }
}
