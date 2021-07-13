import { User } from './../../../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseManagementService } from 'src/app/services/firebase-management.service';
import { ERROR_FORM } from '../../../globalValues';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorFormText = ERROR_FORM;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private firebaseManagementService: FirebaseManagementService,
    private router: Router,
    private authGuardService: AuthenticationService,
  ) {
    this.formGroup = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { 
  }

  login() {
    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(this.formGroup.get('user').value, this.formGroup.get('password').value).then(res => {
      this.loading = false;

      if(res.user?.emailVerified){
        this.setUserToLocalStorage(res.user);
        this.authGuardService.login();
        this.router.navigate(['dashboard/myQuestionnaires']);
      } else {
        this.router.navigate(['/verify']);
      }
    }).catch(error => {
      this.loading = false;
      this.formGroup.reset();
      this.toastr.error(this.firebaseManagementService.errorsFirebase(error.code), 'Oops ha ocurrido un error');
    });
  }

  setUserToLocalStorage(user) {
    const userInterface: User = {
      uid: user.uid,
      email: user.email      
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

}
