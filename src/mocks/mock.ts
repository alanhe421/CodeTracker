/**
 * Created by He on 5/30/17.
 * mock and use native plugins in the browser through a simple override mechanic
 */
export class AppVersionMock {
    version = '1.0.0';

    public getVersionNumber() {
        return new Promise((resolve, reject) => {
            resolve(this.version)
        });
    }
}