/**
 * Created by He on 5/30/17.
 * mock and use native plugins in the browser through a simple override mechanic
 */
import {AppVersion} from "@ionic-native/app-version";
import {Device} from "@ionic-native/device";

export class AppVersionMock extends AppVersion {
    version = "1.1.0";

    public getVersionNumber() {
        return new Promise((resolve, reject) => {
            resolve(this.version);
        });
    }
}

export class DeviceMock extends Device {
    platform: string = 'Android';//iOS,Android
    uuid: string = "ae932e768a1a848";
    version: string = "6.0";
}