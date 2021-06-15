import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOKEN_KEY } from '../globalValues';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor() {
    this.checkToken();
  }

  checkToken() {
    if (localStorage.getItem(TOKEN_KEY)) {
      this.authenticationState.next(true);
    }
  }

  login() {
    localStorage.setItem(TOKEN_KEY, '6hrFDATxrG9w14QY9wwnmVhLE0Wg6LIvwOwUaxz761m1JdsfsdfsdAS5xhSkw0_MQz6bpcJnrFUDwp5lPPFC157dHxbkKlDiQ9XY3ZIP8zAGCsS8ruasdasKjIaIargX');
    this.authenticationState.next(true);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
