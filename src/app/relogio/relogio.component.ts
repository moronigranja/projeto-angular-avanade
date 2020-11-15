import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.css']
})
export class RelogioComponent implements OnInit {  
  time = new Date();
  @Input() timeoffset : number = 0;

  constructor() { }

  ngOnInit() : void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

}
