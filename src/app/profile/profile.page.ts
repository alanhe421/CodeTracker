/**
 * Created by He on 4/4/17.
 */
import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ModalController} from "@ionic/angular";

@Component({
    templateUrl: 'profile.page.html',
})
export class ProfilePage {
    userInfo: any;
    constructor(private authService: AuthService,private modalCtrl:ModalController) {
        this.userInfo = this.authService.userInfo;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
