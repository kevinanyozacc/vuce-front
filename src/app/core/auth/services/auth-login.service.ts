import { Injectable } from '@angular/core';
import { AuthEntityInterface } from '../interfaces/auth-entity.interface';

@Injectable()
export class AuthLoginService {
  public signIn(auth: AuthEntityInterface) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  public logout() {
    localStorage.removeItem('auth');
  }
}
