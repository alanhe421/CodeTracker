import {Injectable} from "@angular/core";
import {LocalSettingService} from "./localsetting.service";
/**
 * Created by He on 4/9/17.
 */
@Injectable(
    {providedIn: 'root'}
)
export class AuthService {

    isLoggedIn: boolean = false;
    userInfo: any;
    platform: string;

    constructor() {
        if (LocalSettingService.getAuthorization()) {
            this.isLoggedIn = true;
            this.userInfo = LocalSettingService.getUserInfo();
        }
    }
}
