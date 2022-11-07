import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../@core/services/storage.service';
import jwtDecode from 'jwt-decode';

export interface UserDecodedProps {
    _id: string;
    name: string;
    iat: number;
    exp: number;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    isHidden = false;
    isLoggedIn = false;
    username!: string;

    constructor(private router: Router, private storage: StorageService) {}

    ngOnInit(): void {
        this.isUserLoggedIn();
    }

    isUserLoggedIn() {
        const token = this.storage.getToken();
        if(token) {
            const tokenEncoded = atob(token);
            const userInfo: UserDecodedProps = jwtDecode(tokenEncoded);
            this.username = userInfo.name;
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    goHome() {
        this.router.navigateByUrl('/employee/list');
    }

    signout() {
        this.storage.logout();
        this.router.navigateByUrl('/');
        this.username = '';
        this.isLoggedIn = false;
    }
}
