import { Type } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { CollectionReference } from "@firebase/firestore";



/**
 * Prototype (inner)-structure of project
 */

export class Message {
    uuidMessage: string; // universal unique identifyer 
    chatid: string; // referenz/verweis auf chat-uuid

    content: string;

    // userId: any: undefined | 'uuidDesUSers'; For detecting direct-message and communication between 2 person, by querying filterd collection.

    author: string; // content-creator, user, username, ...
    createdAt: number = Date.now(); // in ms Datum;   
}

class Chat {
    uuidChat;

    messages: Message[];

    name: string;

    type: ChatType = 'direct-messages'; //  For detecting direct-message and communication between 2 person, by querying filterd collection.
}

type ChatType = 'direct-messages' | 'group-messages';