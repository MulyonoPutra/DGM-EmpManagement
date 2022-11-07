import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { LoadingInterceptor } from '../interceptor/loading.interceptor';

export const Providers: Provider[] = [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
