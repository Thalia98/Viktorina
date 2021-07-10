import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ListQuestionnairesComponent } from './list-questionnaires.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('ListQuestionnairesComponent', () => {
  let component: ListQuestionnairesComponent;
  let fixture: ComponentFixture<ListQuestionnairesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuestionnairesComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
