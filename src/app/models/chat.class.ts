type ChatType = '" "' | 'direct-messages' | 'channels';

export class Chat {

    name: string;

    type: ChatType;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.type = '" "';
    }

    toJSON() {
        return {
            name: this.name,
            type: this.type
        }
    }
}