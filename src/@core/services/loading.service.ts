import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../../@components/spinner/spinner.component';

export declare type ProgressRef = OverlayRef | null;

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private dynamicOverlay: Overlay) { }

    public showProgress() {
        const result = this.dynamicOverlay.create({
            positionStrategy: this.dynamicOverlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
        });
        result.attach(new ComponentPortal(SpinnerComponent));
        return result;
    }

    detach(result: ProgressRef) {
        if (result) {
            result.detach();
        }
    }

}



