import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {LocalSettingService} from "./localsetting.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

/**
 * Created by He on 10/01/18.
 */
@Injectable(
    {providedIn: 'root'}
)
export class TokenInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (LocalSettingService.getAuthorization()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${LocalSettingService.getAuthorization()}`
                }
            });
        }
        return next.handle(request).pipe(tap((event) => {
                return event;
            }),
            (err: any) => {
                return Observable.throw(err);
            }
        );
    }
}
