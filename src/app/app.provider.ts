import {AppVersion} from "@ionic-native/app-version";
import {AppVersionMock, DeviceMock} from "../mocks/mock";
import {Device} from "@ionic-native/device";

export class AppProvider {

    public static getProviders(): Array<any> {

        let providers;

        if (document.URL.includes('https://') || document.URL.includes('http://')) {

            // Use browser providers
            providers = [
                {
                    provide: AppVersion,
                    useClass: AppVersionMock
                },
                {
                    provide: Device,
                    useClass: DeviceMock
                },
            ];

        } else {
            // Use device providers
            providers = [
                AppVersion,
                Device
            ];
        }

        return providers;

    }

}