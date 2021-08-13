import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_FORM } from 'src/app/globalValues';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseManagementService } from 'src/app/services/firebase-management.service';
import { User } from './../../../interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  errorFormText = ERROR_FORM;
  user: String;
  email: String;
  pass: String;
  loading: boolean = false;
  showErrorUsername: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private firebaseManagementService: FirebaseManagementService,
    private userService: UserService,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      user: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: [''],
    }, { validator: this.checkPassword });
  }

  ngOnInit() { }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.formGroup.get('email').value, this.formGroup.get('password').value).then(res => {
      res.user?.sendEmailVerification();

      let user: User = {
        uid: res.user.uid,
        username: this.formGroup.get('user').value,
        email: this.formGroup.get('email').value,
        friends: [],
      };

      this.saveUser(user);
      this.toastr.success('Envío de correo', 'Enviamos de correo para verificar su cuenta');
      this.router.navigate(['/']);
    }).catch(error => {
      this.loading = false;
      this.toastr.error(this.firebaseManagementService.errorsFirebase(error.code), 'Oops ha ocurrido un error');
    })
  }

  checkUser() {
    this.loading = true;
    this.showErrorUsername = false;

    this.userService.checkUsername(this.formGroup.get('user').value).subscribe(res => {
      if(res.length === 0) {
        this.register();
      } else {
        this.loading = false;
        this.showErrorUsername = true;
      }
    }, error => {
      this.loading = false;
    });
  }

  checkPassword(group: FormGroup) {
    let pass = group.controls.password?.value;
    let passRepeat = group.controls.passwordRepeat?.value;
    return pass === passRepeat ? null : { notSame: true };
  }

  saveUser(user) {
    this.userService.saveUser(user);
  }

}
