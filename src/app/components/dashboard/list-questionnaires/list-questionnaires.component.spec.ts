import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Menu } from 'src/app/globalValues';

import { ListQuestionnairesComponent } from './list-questionnaires.component';

describe('ListQuestionnairesComponent', () => {
  let component: ListQuestionnairesComponent;
  let fixture: ComponentFixture<ListQuestionnairesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuestionnairesComponent ],
      imports: [IonicModule.forRoot()],
      providers: [Menu]
    }).compileComponents();

    fixture = TestBed.createComponent(ListQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
