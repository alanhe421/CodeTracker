import {Injectable} from "@angular/core";
/**
 * Created by He on 4/9/17.
 */
@Injectable()
export class AuthService {

    isLoggedIn: boolean = false;
    userInfo: any;

    constructor() {

    }
}