import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Location } from "@angular/common";

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'user', component: LoginComponent },
            { path: 'user/register', component: RegisterComponent },
          ]
        )
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    component.formGroup = component.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', Validators.required],
    }, {
      validator: component.checkPassword
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

    it('should return password repeat control', () => {
      const control = component.formGroup.controls['passwordRepeat'];
      expect(control).toBeTruthy();
    });
  });

  it('should return error text email required', fakeAsync(() => {
    const strongEl = document.getElementById('errorEmailRequired');
    expect(strongEl.innerHTML).toEqual('Este campo no puede estar vacío');
  }));

  it('should return error text email not valid', fakeAsync(() => {
    const strongEl = document.getElementById('errorEmail');
    expect(strongEl.innerHTML).toEqual('Email inválido');
  }));

  it('should return error text password required', fakeAsync(() => {
    const strongEl = document.getElementById('errorPasswordRequired');
    expect(strongEl.innerHTML).toEqual('Este campo no puede estar vacío');
  }));

  it('should return error text password min length', fakeAsync(() => {
    const strongEl = document.getElementById('errorPasswordMinLength');
    expect(strongEl.innerHTML).toEqual('Debe de tener un mínimo de 6 carácteres');
  }));

  it('should return error text password not same with password repeat', fakeAsync(() => {
    const strongEl = document.getElementById('passwordRepeatErrorNotSame');
    expect(strongEl.innerHTML).toEqual('Las contraseñas no coinciden');
  }));

  it('should return error text password repeat is required', fakeAsync(() => {
    const strongEl = document.getElementById('passwordRepeatErrorRequired');
    expect(strongEl.innerHTML).toEqual('Este campo no puede estar vacío');
  }));

  it('should return error password repeat and min length', fakeAsync(() => {
    const passwordInput = (<HTMLInputElement>document.getElementById('passwordInput'));
    const passwordRepeatInput = (<HTMLInputElement>document.getElementById('passwordRepeatInput'));

    passwordInput.value = 'text1';
    passwordRepeatInput.value = 'text2';
    passwordInput.dispatchEvent(new Event('input'));
    passwordRepeatInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.formGroup.get('password').hasError('minlength')).toBe(true);
    expect(component.formGroup.hasError('notSame')).toBe(true);
  }));

});
