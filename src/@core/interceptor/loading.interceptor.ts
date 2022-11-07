/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


    constructor(private progressService: LoadingService) { }

    private requests: HttpRequest<unknown>[] = [];

    removeRequest(req: HttpRequest<any>, progress: any) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        if (progress) {
            progress.detach();
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(request);
        const progress = this.progressService.showProgress();
        return Observable.create((observer: any) => {
            const subscription = next.handle(request)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(request, progress);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.removeRequest(request, progress);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(request, progress);
                        observer.complete();
                    });

            return () => {
                this.removeRequest(request, progress);
                subscription.unsubscribe();
            };
        });
    }
}
