/**
 * Created by He on 5/30/17.
 */
export class LocalSettingService {

    static setAuthorization(apiKey: string): void {
        localStorage.setItem('Authorization', apiKey);
    }

    static getAuthorization(): string {
        return localStorage.getItem('Authorization');
    }


    static setUserInfo(userInfo: any): void {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    static getUserInfo(): any {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}
