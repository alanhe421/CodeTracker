
/**
 * Created by He on 5/30/17.
 * 本地存储服务类
 */
export class LocalSettingService {

    constructor() {

    }

    static  setAuthorization(apiKey: string): void {
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