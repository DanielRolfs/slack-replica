export class Channel {
    name: string;
    id: string;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
    }

    public toJSON() {
        return {
            name: this.name,
        }
    }

}

