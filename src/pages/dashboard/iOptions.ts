/**
 * Created by He on 23/07/2017.
 * 社交分享选项接口类
 */
/**
 * this is the complete list of currently supported params you can pass to the plugin (all optional)
 */
export interface iOptions {
    message?: string, // not supported on some apps (Facebook, Instagram)
    subject?: string, // fi. for email
    files?: string | string[] // an array of filenames either locally or remotely
    url?: string,
    chooserTitle?: string // Android only, you can override the default share sheet title
}