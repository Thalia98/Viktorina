import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
        ReactiveFormsModule
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
