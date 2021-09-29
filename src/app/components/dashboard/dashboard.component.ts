import { PaymentComponent } from './../modals/payment/payment.component';
import { ChallengesPetitionsComponent } from '../modals/challenges-petitions/challenges-petitions.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/User';
import { PAGES } from '../../globalValues';
import { ChallengesService } from 'src/app/services/challenges.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  user: User;
  countPetitions: number = 0;

  pages = PAGES;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authGuardService: AuthenticationService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private challengeService: ChallengesService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.userService.getUserByUsername(this.user.username).subscribe(user => {
      const userInterface: User = {
        id: user[0].payload.doc.id,
        ...user[0].payload.doc.data()
      };

      this.user = userInterface;

      localStorage.setItem('user', JSON.stringify(userInterface));
    });

    this.getMyPetitions();
  }

  logOut() {
    this.afAuth.signOut();
    this.authGuardService.logout();
    this.removeSelected(0);
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

  getMyPetitions() {
    this.challengeService.getMyPetitions(this.user.id).subscribe(res => {
      this.countPetitions = res.length;
    }, error => { });
  }

  openPage(page, index) {
    this.removeSelected(index);
    this.router.navigate([page]);
  }

  async openChallengesNotifications() {
    const modal = await this.modalCtrl.create({
      component: ChallengesPetitionsComponent,
      componentProps: {
        user: this.user
      }
    });
    return await modal.present();
  }

  async openModalShop() {
    const modal = await this.modalCtrl.create({
      component: PaymentComponent
    });
    modal.onDidDismiss()
    .then((data) => {
      if (data?.data['hasPaid']) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    });
    return await modal.present();
  }
}
