/**
 * Created by He on 4/4/17.
 */
import {Component} from "@angular/core";
import {AuthService} from "../../providers/auth.service";
import {ViewController} from "ionic-angular";

@Component({
    templateUrl: 'profile.html',
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