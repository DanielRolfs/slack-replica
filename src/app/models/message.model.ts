export class Message {

    chatId: string; // referenz/verweis auf chat-uuid
    content: string;

    userId: string;

    toJson() {
        return {
            chatId: this.chatId,
            content: this.content
        }
    }
}