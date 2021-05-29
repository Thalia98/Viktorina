import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pin;
  error = false;

  constructor() { }

  enterGame() {
    if (!this.pin) {
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 4000);
    }
  }

}