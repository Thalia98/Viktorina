import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGES } from '../../../globalValues';

@Component({
  selector: 'app-chat-base',
  templateUrl: './chat-base.component.html',
  styleUrls: ['./chat-base.component.scss'],
})
export class ChatBaseComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  goBack() {
    PAGES.forEach(page => {
      if (page.isSelected) {
        this.router.navigate(['/dashboard/' + page.page]);
      }
    });
  }

}
