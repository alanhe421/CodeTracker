/**
 * Created by He on 4/4/17.
 */
import {Storage} from "@ionic/storage";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs";

// Avoid name not found warnings
declare let Auth0: any;
declare let Auth0Lock: any;

const APP_ID = 'YAfge95KBCv2GSiXY0F5oiPK';
// const APP_SECRET = 'sec_ye8ePG0jTgOZ16YuVcxjwQzrjZCC7A1ucimoqTYObtTbaWEOxr6sEeZLiwlcYuBtOJHNLbtyPtIEpu4m';

const AUTH0_DOMAIN = 'https://wakatime.com';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();
    auth0 = new Auth0({clientID: APP_ID, domain: AUTH0_DOMAIN});
    lock = new Auth0Lock(APP_ID, AUTH0_DOMAIN, {
        auth: {
            redirect: false,
            params: {
                scope: 'openid profile offline_access',
                device: 'my-device'
            },
            sso: false
        }
    });
    storage: Storage = new Storage();
    refreshSubscription: any;
    user: Object;
    zoneImpl: NgZone;
    accessToken: string;
    idToken: string;

    constructor(zone: NgZone) {
        /*
        this.zoneImpl = zone;
        // Check if there is a profile saved in local storage
        this.storage.get('profile').then(profile => {
            this.user = JSON.parse(profile);
        }).catch(error => {
            console.log(error);
        });

        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });

        this.lock.on('authenticated', authResult => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.storage.set('access_token', authResult.accessToken);
                this.storage.set('id_token', authResult.idToken);
                this.storage.set('refresh_token', authResult.refreshToken);
                this.accessToken = authResult.accessToken;
                this.idToken = authResult.idToken;

                // Fetch profile information
                this.lock.getUserInfo(this.accessToken, (error, profile) => {
                    if (error) {
                        // Handle error
                        alert(error);
                        return;
                    }

                    profile.user_metadata = profile.user_metadata || {};
                    this.storage.set('profile', JSON.stringify(profile));
                    this.user = profile;
                });

                this.lock.hide();

                this.zoneImpl.run(() => this.user = authResult.profile);
                // // Schedule a token refresh
                this.scheduleRefresh();
            }

        });*/
    }

    public authenticated() {
        return tokenNotExpired('id_token', this.idToken);
    }

    public login() {
        // Show the Auth0 Lock widget
        this.lock.show();
    }

    public logout() {
        this.storage.remove('profile');
        this.storage.remove('access_token');
        this.storage.remove('id_token');
        this.idToken = null;
        this.storage.remove('refresh_token');
        this.zoneImpl.run(() => this.user = null);
        // Unschedule the token refresh
        this.unscheduleRefresh();
    }

    public scheduleRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token

        let source = Observable.of(this.idToken).flatMap(
            token => {
                console.log('token here', token);
                // The delay to generate in this case is the difference
                // between the expiry time and the issued at time
                let jwtIat = this.jwtHelper.decodeToken(token).iat;
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                let iat = new Date(0);
                let exp = new Date(0);

                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            this.getNewJwt();
        });
    }

    public startupTokenRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        if (this.authenticated()) {
            let source = Observable.of(this.idToken).flatMap(
                token => {
                    // Get the expiry time to generate
                    // a delay in milliseconds
                    let now: number = new Date().valueOf();
                    let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                    let exp: Date = new Date(0);
                    exp.setUTCSeconds(jwtExp);
                    let delay: number = exp.valueOf() - now;

                    // Use the delay in a timer to
                    // run the refresh at the proper time
                    return Observable.timer(delay);
                });

            // Once the delay time from above is
            // reached, get a new JWT and schedule
            // additional refreshes
            source.subscribe(() => {
                this.getNewJwt();
                this.scheduleRefresh();
            });
        }
    }

    public unscheduleRefresh() {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    public getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        this.storage.get('refresh_token').then(token => {
            this.auth0.refreshToken(token, (err, delegationRequest) => {
                if (err) {
                    alert(err);
                }
                this.storage.set('id_token', delegationRequest.id_token);
                this.idToken = delegationRequest.id_token;
            });
        }).catch(error => {
            console.log(error);
        });

    }
}