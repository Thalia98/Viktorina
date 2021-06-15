import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_FORM } from 'src/app/globalValues';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseManagementService } from 'src/app/services/firebase-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  errorFormText = ERROR_FORM;
  user: String;
  pass: String;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private firebaseManagementService: FirebaseManagementService
    ) {
    this.formGroup = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: [''],
    }, { validator: this.checkPassword });
  }

  ngOnInit() { }

  register() {
    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(this.formGroup.get('user').value, this.formGroup.get('password').value).then(res => {
      res.user?.sendEmailVerification();
      this.toastr.success('Envío de correo', 'Enviamos de correo para verificar su cuenta');
      this.router.navigate(['/']);
    }).catch(error => {
      this.loading = false;
      this.toastr.error(this.firebaseManagementService.errorsFirebase(error.code), 'Oops ha ocurrido un error');
    })
  }

  checkPassword(group: FormGroup) {
    let pass = group.controls.password?.value;
    let passRepeat = group.controls.passwordRepeat?.value;
    return pass === passRepeat ? null : { notSame: true };
  }

}
