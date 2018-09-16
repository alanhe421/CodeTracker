import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HomePage} from "./home.page";
import {DashboardPage} from "../dashboard/dashboard.page";
import {ProfilePage} from "../profile/profile.page";

@NgModule({
    imports: [
        FormsModule,
        IonicModule,
        CommonModule,
        RouterModule.forChild([
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardPage}
        ])
    ],
    declarations: [HomePage, DashboardPage, ProfilePage]
})
export class HomePageModule {
}
