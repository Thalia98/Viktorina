import { AuthGuard } from './../../guards/auth.guard';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authGuardService: AuthenticationService
  ) { }

  ngOnInit() { }

  logOut() {
    this.afAuth.signOut();
    this.authGuardService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
