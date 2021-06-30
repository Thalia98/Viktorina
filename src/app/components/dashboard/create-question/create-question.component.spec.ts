import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CreateQuestionComponent } from './create-question.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('CreateQuestionComponent', () => {
  let component: CreateQuestionComponent;
  let fixture: ComponentFixture<CreateQuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestionComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
