import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_FORM } from 'src/app/globalValues';
import { AngularFireAuth } from '@angular/fire/auth'

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

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth) {
    this.formGroup = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: [''],
    }, { validator: this.checkPassword });
  }

  ngOnInit() { }

  register() {
    this.afAuth.creatUserWithEmailAndPassword();
  
  }

  checkPassword(group) {
    let pass = group.controls.password?.value;
    let passRepeat = group.controls.passwordRepeat?.value;
    return pass === passRepeat ? null : { notSame: true };
  }

}
