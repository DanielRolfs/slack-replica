export class Channel {
    channelName: string;

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
    }
}