import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AlertService} from './alert.service';
import 'rxjs/add/operator/do';
import {LocalSettingService} from "./localsetting.service";

/**
 * Created by He on 10/01/18.
 * 令牌拦截器
 */
@Injectable()
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

        return next.handle(request).do((event) => {
                return event;
            },
            (err: any) => {
                return Observable.throw(err);
            }
        );
    }
}
