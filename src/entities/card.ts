import { User } from "./user";

export class Card {
    public createdAt: Date
    constructor(public question: string, public answer: string, public userId: string, public tag?: string) {
        this.createdAt = new Date()
    }
}