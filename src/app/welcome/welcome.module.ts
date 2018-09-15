import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomePage} from "./welcome.page";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        FormsModule,
        IonicModule,
        CommonModule,
        RouterModule.forChild([{path: '', component: WelcomePage}])
    ],
    declarations: [WelcomePage]
})
export class WelcomePageModule {
}
