import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { Location } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../user/login/login.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule.withRoutes(
          [
            { path: '', component: HomeComponent },
            { path: 'user', component: LoginComponent },
        ]
        )]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pin should not be null', waitForAsync(() => {
    component.pin = null;
    document.getElementById('enterGame').click();
    expect(component.error).toBe(true);
  }));

  it('enter game', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const pinInput = (<HTMLInputElement>document.getElementById('numberPin'));
    pinInput.value = 'kkk';
    pinInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    document.getElementById('enterGame').click();
    expect(component.error).toBe(false)
  });

  it('go to login', fakeAsync(() => {
    document.getElementById('goLogin').click();
    tick();

    // console.log(location.path());
    // expect(location.path()).toBe('/user');
  }));

});
