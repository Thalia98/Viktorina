import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ERROR_FORM } from 'src/app/globalValues';
import { FirebaseManagementService } from 'src/app/services/firebase-management.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  formGroup: FormGroup;
  errorFormText = ERROR_FORM;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private firebaseManagementService: FirebaseManagementService,
    private router: Router,
    ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() { }

  recoverPass() {
    this.loading = true;

    this.afAuth.sendPasswordResetEmail(this.formGroup.get('email').value).then(() => {
      this.toastr.info('Restablecer contraseña', 'Enviamos un correo para restablecer la contraseña.')
      this.router.navigate(['/user']);
    }).catch( error => {
      this.loading = false;

      this.toastr.error(this.firebaseManagementService.errorsFirebase(error.code));
      this.formGroup.reset();
    });
    
  }

}
