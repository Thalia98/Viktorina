import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../login/login.component';

import { RecoverPasswordComponent } from './recover-password.component';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverPasswordComponent],
      imports: [
        CommonModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'user', component: LoginComponent },
          ]
        ),
        ToastrModule.forRoot(),
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;

    component.formGroup = component.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    fixture.detectChanges();
  }));

  describe('control getters', () => {
    it('should return email control', () => {
      const control = component.formGroup.controls['email'];
      expect(control).toBeTruthy();
    });
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return error text email required', fakeAsync(() => {
    const strongEl = document.getElementById('errorEmailRequired');
    expect(strongEl.innerHTML).toEqual('Este campo no puede estar vacío');
  }));

  it('should return error text email not valid', fakeAsync(() => {
    const strongEl = document.getElementById('errorEmail');
    expect(strongEl.innerHTML).toEqual('Email inválido');
  }));
});
