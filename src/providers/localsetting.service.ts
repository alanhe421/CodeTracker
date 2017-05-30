import {Base64} from "js-base64";

/**
 * Created by He on 5/30/17.
 * 本地存储服务类
 */
export class LocalSettingService {

    constructor() {

    }

    static  setAPIKey(apiKey: string): void {
        localStorage.setItem('Authorization', Base64.encode(apiKey));
    }

    static getAPIKey(): string {
        return localStorage.getItem('Authorization');
    }

    static setUserInfo(userInfo: any): void {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    static getUserInfo(): any {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}