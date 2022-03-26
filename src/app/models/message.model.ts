export class Message {

    chatId: string; // referenz/verweis auf chat-uuid
    content: string;
    author: string;
    createdAt: number;

    toJson() {
        return {
            chatId: this.chatId,
            content: this.content,
            author: this.author,
            createdAt: this.createdAt
        }
    }
}