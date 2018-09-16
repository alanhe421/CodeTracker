export interface iOptions {
    message?: string, // not supported on some apps (Facebook, Instagram)
    subject?: string, // fi. for email
    files?: string | string[] // an array of filenames either locally or remotely
    url?: string,
    chooserTitle?: string // Android only, you can override the default share sheet title
}
