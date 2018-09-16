/**
 * Created by He on 4/4/17.
 */
import {Component} from "@angular/core";
import {ViewController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";

@Component({
    templateUrl: 'profile.page.html',
})
export class ProfilePage {
    userInfo: any;
    // We need to inject AuthService so that we can
    // use it in the view
    constructor(private authService: AuthService, public viewCtrl: ViewController) {
        this.userInfo = this.authService.userInfo;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
