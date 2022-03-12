export class User {
    uid?: string; // uuidUser
    email?: string;
    displayName?: string;
    photoURL?: string;
    status?: string;


    constructor(obj?: any) {
        this.displayName = obj ? obj.name : '';
        this.uid = '" "';
        this.email = obj ? obj.email : '';
        this.photoURL= obj ? obj.photoURL : '';
        this.status = obj ? obj.status : '';
    }

    toJSON() {
        return {
            displayName: this.displayName,
            uid: this.uid,
            email: this.email,
            photoURL: this.photoURL,
            status: this.status,
        }
    }
}