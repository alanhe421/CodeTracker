import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

/**
 * Created by He on 6/2/17.
 * 错误处理服务类
 */
@Injectable(
    {providedIn: 'root'}
)
export class ErrorService {
    private error = new Subject<any>();

    error$ = this.error.asObservable();//错误码
    constructor() {

    }

    updateError(error: any) {
        this.error.next(error);
    }
}
