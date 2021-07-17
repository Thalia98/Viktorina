import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  user: User;

  pages = [
    {
      page: 'myQuestionnaires',
      icon: 'clipboard-outline',
      title: 'Mis cuestionarios',
      isSelected: true
    },
    {
      page: '',
      icon: 'reader-outline',
      title: 'Todos los cuestionarios',
      isSelected: false
    }
  ];

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
    this.pages.forEach((page, i) => {
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
