import {Injectable} from "@angular/core";
import {RequestOptions} from "@angular/http";
/**
 *
 */
@Injectable()
export class HeaderWithToken {
    Option: RequestOptions;

    constructor() {
        // let jsonHeader = new Headers();
        // jsonHeader.append('Content-Type', 'application/json;charset=utf-8');
        // jsonHeader.append('Cache-Control', 'no-cache');
        // this.Option = new RequestOptions({headers: jsonHeader});
    }
}