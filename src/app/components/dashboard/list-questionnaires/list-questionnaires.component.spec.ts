import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ListQuestionnairesComponent } from './list-questionnaires.component';

describe('ListQuestionnairesComponent', () => {
  let component: ListQuestionnairesComponent;
  let fixture: ComponentFixture<ListQuestionnairesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuestionnairesComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
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
