export class Channel {
    name: string;
    id: string;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.id = obj ? obj.id: '';
    }

    public toJSON() {
        return {
            name: this.name,
            id: this.id,
        }
    }

}

