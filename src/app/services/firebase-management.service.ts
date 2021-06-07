import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseManagementService {

  constructor() { }

  errorsFirebase(cod: string) {
    switch (cod) {
      case 'auth/invalid-email':
        return 'El email no es válido';
      case 'auth/invalid-password':
        return 'La contraseña es débil';
      case 'auth/email-already-exists':
        return 'El email ya existe.';
      case 'auth/email-already-in-use':
        return 'El email ya está en uso.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/user-not-found':
        return 'El usuario no existe.';
      default:
        return '';
    }
  }
}
