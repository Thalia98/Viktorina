import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Location } from "@angular/common";

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';
import { RegisterComponent } from '../register/register.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(
          [
            { path: 'user/recoverPass', component: RecoverPasswordComponent },
            { path: 'user/register', component: RegisterComponent },
        ]
        )
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.formGroup = component.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('control getters', () => {
    it('should return user control', () => {
      const control = component.formGroup.controls['user'];
      expect(control).toBeTruthy();
    });

    it('should return password control', () => {
      const control = component.formGroup.controls['password'];
      expect(control).toBeTruthy();
    });
  });

  it('should return error email required', fakeAsync(() => {
    document.getElementById('submitButton').click();

    const strongEl = document.getElementById('errorEmailRequired');
    expect(strongEl.innerHTML).toEqual('Este campo no puede estar vacío');
  }));

  it('should return error email not valid', fakeAsync(() => {
    document.getElementById('submitButton').click();

    const strongEl = document.getElementById('errorEmail');
    expect(strongEl.innerHTML).toEqual('Email inválido');
  }));

  it('should return error password required', fakeAsync(() => {
    document.getElementById('submitButton').click();

    const strongEl = document.getElementById('errorPasswordRequired');
    expect(strongEl.innerHTML).toEqual('Este campo no puede estar vacío');
  }));

});
