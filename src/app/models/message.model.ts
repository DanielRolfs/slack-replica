export class Message {

    chatId: string; // referenz/verweis auf chat-uuid
    content: string;
    author: string;

    toJson() {
        return {
            chatId: this.chatId,
            content: this.content,
            author: this.author
        }
    }
}