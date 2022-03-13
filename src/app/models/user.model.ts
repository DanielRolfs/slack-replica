export class CostumUser {

    uid: string;
    email: string;
    status: boolean;
    photoURL: string;
    displayName: string;
    emailVerified: boolean

    constructor(
        uid?: string,
        email?: string,
        status?: boolean,
        photoURL?: string,
        displayName?: string,
        emailVerified?: boolean,
    ) {
        this.uid = uid ? uid : '';
        this.email = email ? email : '';
        this.status = status ? status : false;
        this.photoURL = photoURL ? photoURL : '';
        this.displayName = displayName ? displayName : '';
        this.emailVerified = emailVerified ? emailVerified : false;
    }

    toJSON() {
        return {
            uid: this.uid,
            email: this.email,
            status: this.status,
            photoURL: this.photoURL,
            displayName: this.displayName,
            emailVerified: this.emailVerified,
        }
    }
}