import {Injectable} from "@angular/core";
import {LocalSettingService} from "./localsetting.service";
/**
 * Created by He on 4/9/17.
 */
@Injectable()
export class AuthService {

    isLoggedIn: boolean = false;
    userInfo: any;

    constructor() {
        if (LocalSettingService.getAuthorization()) {
            this.isLoggedIn = true;
            this.userInfo = LocalSettingService.getUserInfo();
        }
    }
}