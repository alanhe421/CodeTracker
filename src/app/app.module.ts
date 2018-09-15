import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        InAppBrowser,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap:
        [AppComponent]
})

export class AppModule {
}
