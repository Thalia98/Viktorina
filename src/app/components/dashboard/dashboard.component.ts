import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/interfaces/User';
import { PAGES } from '../../globalValues';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  user: User;

  pages = PAGES;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authGuardService: AuthenticationService,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut() {
    this.afAuth.signOut();
    this.authGuardService.logout();
    localStorage.removeItem('user');
    this.menuCtrl.close();
    this.router.navigate(['/']);
  }

  removeSelected(index) {
    PAGES.forEach((page, i) => {
      if (index !== i) {
        page.isSelected = false;
      } else {
        page.isSelected = true;
      }
    })
  }

  openPage(page, index) {
    this.removeSelected(index);
    this.router.navigate(['/dashboard/' + page]);
  }
}
