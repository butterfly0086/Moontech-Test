import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { StorageService } from './_services/storage.service';

@Injectable({
  providedIn: "root"
})

class AuthGuard {
  constructor(private router: Router, private storageService: StorageService,) {}

  canActivate(): boolean {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);

      return false;
    }
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
};
