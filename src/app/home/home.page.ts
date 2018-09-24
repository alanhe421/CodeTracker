import {Component} from "@angular/core";
import {AlertController, ModalController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ProfilePage} from "../profile/profile.page";

@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html'
})
export class HomePage {
    userInfo: any;

    constructor(public authService: AuthService,
                private route: Router,
                public modalController: ModalController,
                private alertCtrl: AlertController) {
        this.userInfo = this.authService.userInfo;
    }

    //退出
    async logout() {
        let confirm = await this.alertCtrl.create({
            header: 'log out?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.route.navigateByUrl('/');
                        localStorage.removeItem('Authorization');
                    }
                }
            ]
        });
        await confirm.present();
    }

    async presentModal() {
        let modal = await this.modalController.create({component: ProfilePage});
        await modal.present();
    }

}
