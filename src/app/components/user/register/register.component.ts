import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_FORM } from 'src/app/globalValues';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) {
    this.formGroup = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: [''],
    }, { validator: this.checkPassword });
  }

  ngOnInit() { }

  register() {
    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(this.formGroup.get('user').value, this.formGroup.get('password').value).then(() => {
      this.toastr.success('', 'Usuario registrado con éxito');
      this.router.navigate(['/user']);
    }).catch(error => {
      this.loading = false;
      this.toastr.error(this.errorFirebaseRegister(error.code), 'Oops ha ocurrido un error');
    })
  }

  errorFirebaseRegister(cod: string) {
    switch (cod) {
      case 'auth/invalid-email':
        return 'El email no es válido';
      case 'auth/invalid-password':
        return 'La contraseña es débil';
      case 'auth/email-already-exists':
        return 'El email ya existe.';
      case 'auth/email-already-in-use':
        return 'El email ya está en uso.';
      default:
        return '';
    }
  }

  checkPassword(group: FormGroup) {
    let pass = group.controls.password?.value;
    let passRepeat = group.controls.passwordRepeat?.value;
    return pass === passRepeat ? null : { notSame: true };
  }

}
