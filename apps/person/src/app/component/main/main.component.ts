import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'person-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  tonewuser(){
    this.router.navigate(['/addUser']);
  }
  toseeuser(){
    this.router.navigate(['']);
  }

}
