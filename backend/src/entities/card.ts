import { DurationInDay } from "../@types/TimeInDay"
import { User } from "./user"

export class Card {
    public createdAt: Date
    constructor(public id: string, public question: string, public answer: string, public userId: string, public category: Card.Category = Card.Category.FIRST, public tag?: string) {
        this.createdAt = new Date()
        this.createdAt.setHours(0, 0, 0)
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

    export const CategoryDuration: Record<Category, DurationInDay> = {
        [Category.FIRST]: 1,
        [Category.SECOND]: 2,
        [Category.THIRD]: 4,
        [Category.FOURTH]: 8,
        [Category.FIFTH]: 16,
        [Category.SIXTH]: 32,
        [Category.SEVENTH]: 64,
        [Category.DONE]: -1
    }
}
