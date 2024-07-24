import { Injectable, Inject, inject } from '@angular/core';
import {ActivatedRouteSnapshot,Router,RouterStateSnapshot,CanActivateFn,} from '@angular/router';
import { UserService } from '../Service/user.service';

@Injectable({
  providedIn: 'root',
})
class PermissionService {
  constructor(private service: UserService, private route: Router) {}

  canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      // this.route.navigate(['/signIn']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionService).canActive(next, state);
};
