import { User } from "./user"

export class Card {
    public createdAt: Date
    constructor(public id: string, public question: string, public answer: string, public userId: string, public category: Card.Category = Card.Category.FIRST, public tag?: string) {
        this.createdAt = new Date()
    }

    toJSON() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            category: this.category,
            tag: this.tag
        }
    }
}

export namespace Card {
    export interface Create {
        question: string,
        answer: string,
        user: User,
        tag?: string
    }

    export enum Category {
        FIRST = 'FIRST',
        SECOND = 'SECOND',
        THIRD = 'THIRD',
        FOURTH = 'FOURTH',
        FIFTH = 'FIFTH',
        SIXTH = 'SIXTH',
        SEVENTH = 'SEVENTH',
        DONE = 'DONE'
    }
}
