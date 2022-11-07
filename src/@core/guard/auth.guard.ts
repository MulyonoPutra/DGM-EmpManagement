import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private tokenService: StorageService, private router: Router, private messages: SnackbarService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.tokenService.loadToken()) {
            this.messages.error('You cannot access this page, please login first!', 4000);
            this.router.navigate(['/'], {queryParams: { returnUrl: state.url }, replaceUrl: true});
            return false;
        }
        return true;
    }

}
